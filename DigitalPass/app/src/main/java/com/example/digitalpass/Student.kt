package com.example.digitalpass

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.bumptech.glide.Glide
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.textfield.TextInputLayout
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority

class Student : BaseActivity() {
    private lateinit var galleryLauncher: ActivityResultLauncher<String>
    private lateinit var profileImage: ImageView
    private lateinit var adapter: RecentPassAdapter
    private var gatePassList= arrayListOf<HashMap<String,String>>()
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var pendingReason: String = ""

    private var progressBar: CustomProgressBar?=null

    private var getCommonData={gatePass:HashMap<String,String>->
        gatePass["img"]=LoginUserDataHolder.loginUserData?.get("img")?:""
        gatePass["name"]=LoginUserDataHolder.loginUserData?.get("name")?:""
        gatePass["applyEmail"]=LoginUserDataHolder.loginUserData?.get("email")?:""
        gatePass["department"]=LoginUserDataHolder.loginUserData?.get("department")?:""
        gatePass["campus"]=LoginUserDataHolder.loginUserData?.get("campus")?:""
        gatePass["role"]=LoginUserDataHolder.loginUserData?.get("role")?:""
        gatePass["phone"]=LoginUserDataHolder.loginUserData?.get("phone")?:""
        gatePass
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_student)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        galleryLauncher=registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            if (uri == null) return@registerForActivityResult
            // Upload image to server
            CommonOperation.uploadImage(this,uri)
        }

        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)
        swipeRefreshLayout.setOnRefreshListener {
            getGatePass()
        }

//profile data setup
        profileImage = findViewById(R.id.ProfileImage)

        //now setup user profile in CommonOperation
        CommonOperation.setupUserProfile(this)

        var drawer=findViewById<DrawerLayout>(R.id.drawerLayout)
        profileImage.setOnClickListener {
            drawer.openDrawer(GravityCompat.END)
        }
        var editProfilePictureLogo=findViewById<ImageView>(R.id.editProfilePictureLogo)
        editProfilePictureLogo.setOnClickListener {
            galleryLauncher.launch("image/*")
        }

        //setup recyclerView
        var recyclerView=findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.studentRecyclerView)
        recyclerView.layoutManager=androidx.recyclerview.widget.LinearLayoutManager(this)
        adapter= RecentPassAdapter("selfGatePass", gatePassList)
        recyclerView.adapter=adapter

        //get all gate pass
        getGatePass()

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        //apply for gate pass
        var applyButton=findViewById<Button>(R.id.applyForGatePass)
        applyButton.setOnClickListener {
            showDialogueToGetReason()
        }

    }

    private fun showDialogueToGetReason() {
        val dialogView = layoutInflater.inflate(R.layout.show_dialog_to_give_aproval_visitor, null)
        var dialogApplyButton=dialogView.findViewById<Button>(R.id.remarkDoneButton)
        var reason=dialogView.findViewById<EditText>(R.id.remark)

        //setup text of button hint for applying gate pass
        dialogApplyButton.text="Apply"

        dialogView.findViewById<TextInputLayout>(R.id.nameInputLayout).hint = "Reason for gate pass"
        
        var dialog = MaterialAlertDialogBuilder(this)
            .setView(dialogView)
            .create()
        dialog.show()

        dialogApplyButton.setOnClickListener {
            if(reason.text.toString().trim()==""){
                Toast.makeText(this,"Please enter reason",Toast.LENGTH_SHORT).show()
            }else{
                checkLocationAndApply(reason.text.toString().trim())
                dialog.dismiss()
            }
        }

    }

    private fun checkLocationAndApply(reason: String) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            pendingReason = reason
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), 1001)
            return
        }

        progressBar?.startProgressBar()
        fusedLocationClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null).addOnSuccessListener { location ->
            if (location != null) {
                applyForGatePass(reason, location.latitude.toString(), location.longitude.toString())
            } else {
                progressBar?.stopAnimation()
                Toast.makeText(this, "Unable to get location. Please ensure GPS is enabled.", Toast.LENGTH_SHORT).show()
            }
        }.addOnFailureListener {
            progressBar?.stopAnimation()
            Toast.makeText(this, "Failed to get location.", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 1001) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                checkLocationAndApply(pendingReason)
            } else {
                Toast.makeText(this, "Location permission is required to apply for gate pass", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun applyForGatePass(reason: String, latitude: String, longitude: String) {
        var callToApplyGatePass= RetrofitClient.instance.applyForGatePass(
            hashMapOf(
                "reason" to reason,
                "token" to LoginUserDataHolder.token,
                "latitude" to latitude,
                "longitude" to longitude
            )
        )
        callToApplyGatePass.enqueue(object: Callback<HashMap<String,String>> {
            override fun onResponse(
                call: Call<HashMap<String, String>?>,
                response: Response<HashMap<String, String>?>
            ) {
                progressBar?.stopAnimation()
                if(response.isSuccessful){
                    Toast.makeText(this@Student,"Gate pass applied successfully",Toast.LENGTH_SHORT).show()
                    //also add some common information here

                    gatePassList.add(0,getCommonData(response.body()!!))
                    adapter.updateList(gatePassList)

                }else{
                    Toast.makeText(this@Student,LoginUserDataHolder.getErrorMessage(response),Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(
                call: Call<HashMap<String, String>?>,
                t: Throwable
            ) {
                progressBar?.stopAnimation()
            }
        })


    }

    private fun getGatePass(){
        if (!swipeRefreshLayout.isRefreshing) {
            progressBar?.startProgressBar()
        }
        var callToGetRecentSelfUserGatePass= RetrofitClient.instance.getSelfUserGatePass(LoginUserDataHolder.token)
        callToGetRecentSelfUserGatePass.enqueue(object: Callback<ArrayList<HashMap<String,String>>> {
            override fun onResponse(
                call: Call<ArrayList<HashMap<String, String>>?>,
                response: Response<ArrayList<HashMap<String, String>>?>
            ) {
                progressBar?.stopAnimation()
                swipeRefreshLayout.isRefreshing = false
                if(response.isSuccessful) {
                    gatePassList.clear()
                    //we have to add some common information in each gate pass from loginUserData
                    for (gatePass in response.body()!!) {
                        gatePassList.add(getCommonData(gatePass))
                    }
                    adapter.updateList(gatePassList)
                }
            }

            override fun onFailure(
                call: Call<ArrayList<HashMap<String, String>>?>,
                t: Throwable
            ) {
                progressBar?.stopAnimation()
                swipeRefreshLayout.isRefreshing = false
                Toast.makeText(this@Student,"Something went wrong",Toast.LENGTH_SHORT).show()
            }

        })

    }

    override fun onResume(){
        super.onResume()
    }
}
