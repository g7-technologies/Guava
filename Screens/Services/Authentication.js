// import { BasePath, ChatBasePath } from "../../../config/Basepath";
import { BasePath } from "./BasePath";
import moment from "moment";
import * as Notifications from 'expo-notifications'
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-community/async-storage";
export const LoginCheck = async(email, password)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    try {
        var result = await fetch(`${BasePath}login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const SignUpCheck = async(username,name,email,dob,password)=>{
    const formData = new FormData();
    formData.append('username',username);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('dob',moment(dob).format('DD-MM-YYYY'));
    formData.append('password',password);
    try {
        var result = await fetch(`${BasePath}register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)

        return e
    }

}
//Feeds Folder screen name : (Home Screen )Api

export const GetUserFriendPosts = async(id)=>{
    const formData = new FormData();
    formData.append('user_id',id);
  
    try {
        var result = await fetch(`${BasePath}feed-posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
 
//Feeds Folder  screen name: Other Person Profile (Start follow or unfollow)
export const Followup = async(myid,otherid,state)=>{
    const formData = new FormData();
    formData.append('follower_id',myid);
    formData.append('follow_to_id',otherid);

  
    try {
        var result = await fetch(`${BasePath}${state}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const PartnershiporBrands = async(id)=>{
    const formData = new FormData();
    formData.append('user_id',id);
    try {
        var result = await fetch(`${BasePath}brands`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const GetAllUserList = async(id,SearchQuery)=>{
    const formData = new FormData();
    formData.append('user_id',id);
    formData.append('query',SearchQuery);
  
    try {
        var result = await fetch(`${BasePath}search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const  RecentSearches=async(id)=>{
    const formData = new FormData();
    formData.append('user_id',id);

    try {
        var result = await fetch(`${BasePath}recent-searches`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export const  AddRecentSearches=async(my,otherpersonid)=>{
    const formData = new FormData();
    formData.append('user_id',my);
    formData.append('searched_user_id',otherpersonid);


    try {
        var result = await fetch(`${BasePath}add-recent-searches`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }
}
export const  DeleteRecentSearches=async(otherpersonid)=>{
    const formData = new FormData();
   
    formData.append('searched_id',otherpersonid);



    try {
        var result = await fetch(`${BasePath}delete-recent-search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export const GetOtherUserInfo = async(my,user)=>{
    const formData = new FormData();
    formData.append('my_id',my);
    formData.append('user_id',user);
  
    try {
        var result = await fetch(`${BasePath}get-user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const GetMyPosts = async(my,user)=>{
    const formData = new FormData();
    formData.append('my_id',my);
    formData.append('user_id',user);
  
    try {
        var result = await fetch(`${BasePath}my-posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const ForgotPassword = async(email)=>{
    const formData = new FormData();
    formData.append('email',email);
    try {
        var result = await fetch(`${BasePath}forgotpass`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const GettingPostComments = async(myid,postid)=>{
    const formData = new FormData();
    formData.append('user_id',myid);
    formData.append('post_id',postid);

    try {
        var result = await fetch(`${BasePath}post-comments`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const ManageAccount = async(id,username,name,bio,dob,image=null)=>{
    const formData = new FormData();
    
    formData.append('user_id',id);
    formData.append('username',username);
    formData.append('name',name);
    formData.append('bio',bio);
    formData.append('dob',dob);

    if(image != null || image != ''){
        formData.append('image',image);
    }

    try {
        var result = await fetch(`${BasePath}update-profile`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const ManageBusinessAccount = async(id,name,bio,image=null)=>{
    const formData = new FormData();
    
    formData.append('user_id',id);
  
    formData.append('name',name);
    formData.append('description',bio);
    

    if(image != null || image != ''){
        formData.append('image',image);
    }

    try {
        var result = await fetch(`${BasePath}update-business-profile`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const UpdateEmail = async(id, email)=>{
    
    const formData = new FormData();
    formData.append('user_id',id);
    formData.append('email',email);
    try {
        var result = await fetch(`${BasePath}update-email`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const UpdatePassword = async(id, old,newpass,confirmpass)=>{
    const formData = new FormData();
    formData.append('user_id',id);
    formData.append('old_password',old);
    formData.append('password',newpass);
    formData.append('confirm_password',confirmpass);



    try {
        var result = await fetch(`${BasePath}change-password`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const CreatePosts= async(id,description,pinned,privates,isbusiness,pins,location,image,friends,video)=>{
    // console.log(typeof friends)
    // var fri = Object.values(friends)
    console.log(location)
    const formData = new FormData();
    friends.forEach((item)=> {
        formData.append('private_users',item.id);
    })
    image.forEach((item)=> {
        formData.append('images',item);
    })
    video.forEach((item)=> {
        formData.append('videos',item);
    })
    formData.append('user_id',id);
    formData.append('caption',description);
    formData.append('pinned',pinned);
    formData.append('private',friends.length>0?true:false);
    formData.append('business_post',isbusiness);
    formData.append('pins',pins);
    formData.append('location',location==null?"":location);

   
    try {
        var result = await fetch(`${BasePath}create-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }


} 

export const CreatePinnedPosts= async(id,description,pinned,privates,isbusiness,pins,location,image,friends,video)=>{

    console.log(location)
    const formData = new FormData();
    friends.forEach((item)=> {
        formData.append('private_users',item.id);
    })
    image.forEach((item)=> {
        formData.append('images',item);
    })
    video.forEach((item)=> {
        formData.append('videos',item);
    })

    formData.append('user_id',id);
    formData.append('caption',description);
    formData.append('pinned',pinned);
    formData.append('private',privates);
    formData.append('business_post',isbusiness);
    formData.append('pins',pins);
    formData.append('location',location);

   
    try {
        var result = await fetch(`${BasePath}create-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }


} 


export const SinglePost = async(userid, postid)=>{
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('post_id',postid);
    try {
        var result = await fetch(`${BasePath}single-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 



export const SharePost= async(UserID,PostID)=>{


    const formData = new FormData();
   

    formData.append('user_id',UserID);
    formData.append('post_id',PostID);
    

   
    try {
        var result = await fetch(`${BasePath}post-share`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }


} 

export const DeleteMyPost= async(UserID,PostID)=>{

   
    const formData = new FormData();
   

    formData.append('user_id',UserID);
    formData.append('post_id',PostID);
    

   
    try {
        var result = await fetch(`${BasePath}delete-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }


} 

export const UpdateConnectRequestStatus=async(myid,userid)=>{
    const formData = new FormData();
    formData.append('celebrity',myid);
    formData.append('business',userid);
    



    try {
        var result = await fetch(`${BasePath}partnership-connect`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export const SetWalletPrice = async(id, old)=>{
    const formData = new FormData();
    formData.append('user_id',id);
    formData.append('coins',old);
    



    try {
        var result = await fetch(`${BasePath}set-coins`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const NotifictionStatus = async(id)=>{
   
   
    // formData.append('notification',status);
    try {
        var result = await fetch(`${BasePath}toggle-notifications/${id}`)
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const AccountPrivacy = async(id)=>{
   
   
    // formData.append('notification',status);
    try {
        var result = await fetch(`${BasePath}private-account/${id}`)
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const FacebookLogin = async () => {

    // const appId = '410520310175330';
    const appId = '1270305600052488';
    // this.setState({ isLoading: true })
    try {
      await Facebook.initializeAsync(appId);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ['public_profile', 'email'],
          behavior: 'web'
        });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,name,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            return data
           
          })
          .catch(e => console.log(e))
      } else {
        // this.setState({ isLoading: false })
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      // this.setState({ isLoading: false })
    }
}

export const  registerForPushNotificationsAsync=async()=> {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
      console.log(token);
    } else {
    //   alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
   


  
  

export const GetUseridAsync=async(id)=>{ 
    await AsyncStorage.setItem("UserId",id)
}
export const GetUserRecordAsync=async(record)=>{ 
    await AsyncStorage.setItem("UserRecord",record)
    await AsyncStorage.setItem("userLoggedin","1")

}
export const SetCoinsAsync=async(record)=>{  
    await AsyncStorage.setItem("BuyMeCoins",record)
}

export const GetCoinsAsync=async()=>{ 
    return await AsyncStorage.getItem("BuyMeCoins")
}
 
export const StorePartnershipRequest=async(record)=>{ 
    await AsyncStorage.setItem("StorePartnershipRequest",record)
}
export const RetrivePartnershipRequest=async()=>{ 
   return await AsyncStorage.getItem("StorePartnershipRequest")
}

export const StoreBrands=async(record)=>{ 
    await AsyncStorage.setItem("StoreBrands",record)
}
export const RetriveBrands=async()=>{ 
   return await AsyncStorage.getItem("RetriveBrands")
}



export const GetFollowerRecordAsync=async(record)=>{ 
    await AsyncStorage.setItem("Followers",record)
}
export const GetFollowingRecordAsync=async(record)=>{ 
    await AsyncStorage.setItem("Followings",record)
}
export const GetCollaborationRequest=async(record)=>{ 
    await AsyncStorage.setItem("Collaborations",record)
}
export const ReturnUserRecordAsync=async()=>{
  var Loggedin=await AsyncStorage.getItem("userLoggedin")
  var user= JSON.parse(await AsyncStorage.getItem("UserRecord"))
  var followers = JSON.parse(await AsyncStorage.getItem("Followers"))
  var followings=JSON.parse(await AsyncStorage.getItem("Followings"))
  var userid=JSON.parse(await AsyncStorage.getItem("UserId"))
  var Collaborations=JSON.parse(await AsyncStorage.getItem("Collaborations"))


  

  return [user,followers,followings,Loggedin,userid,Collaborations]
}



export const RemoveUserRecordAsync=async()=>{
    await AsyncStorage.setItem("userLoggedin","0")
    await AsyncStorage.removeItem("UserRecord")
    await AsyncStorage.removeItem("Followers")
    await AsyncStorage.removeItem("Followings")
  }

// var data = ReturnUserRecordAsync()
// var user = data[0]
// var followers = data[1]

export const GetAllNotification=async (id)=>{
   


}

//Get Chat by room id

export const getChat = async(group_id, user_id)=>{
    const formData = new FormData();
    formData.append('group_id',group_id);
    formData.append('user_id',user_id);
    console.log(formData)
    try {
        var result = await fetch(`${ChatBasePath}get-chat`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        console.log('bheja');
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const MessageSeen = async(group_id, user_id)=>{
    const formData = new FormData();
    formData.append('group_id',group_id);
    formData.append('user_id',user_id);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}seen-chat`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const WalletDetail = async( user_id)=>{
    const formData = new FormData();
    formData.append('user_id',user_id);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}wallet-details`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const AllPartnershipRequest = async( user_id)=>{
    const formData = new FormData();
    formData.append('user_id',user_id);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}partnership-requests`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const PartnershipAccept = async(requestid)=>{
    let d=requestid.toString()
   
    const formData = new FormData();
    formData.append('request_id',d);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}partnership-accept`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const AllBrnads = async(requestid)=>{
    let d=requestid.toString()
    const formData = new FormData();
    formData.append('user_id',d);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}brands`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const SeenNotifications = async(requestid)=>{
    alert(requestid)
    return
    let d=requestid.toString()
    const formData = new FormData();
    formData.append('user_id',d);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}seen-notifications`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const PartnershipReject = async(requestid)=>{
    let d=requestid.toString()
    const formData = new FormData();
    formData.append('request_id',d);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}partnership-reject`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const GuavaCoins = async()=>{
   
   
    // formData.append('notification',status);
    try {
        var result = await fetch(`${BasePath}coins`)
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const BuyCoin = async(userid,coins,amount,token)=>{
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('coins',coins);
    formData.append('amount',amount);
    formData.append('token',token);

    console.log(formData)
    try {
        var result = await fetch(`${BasePath}buy-coins`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
      
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

export const UpdateToken = async( user_id,token)=>{
    
    const formData = new FormData();
    formData.append('user_id',user_id);
    formData.append('token',token);

   
    try {
        var result = await fetch(`${BasePath}set-expo_token`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
        return result.json()
       
    } catch (e) {
        console.log(e)
        return e
    }

} 
export const TransactionHistory = async( user_id)=>{
    const formData = new FormData();
    formData.append('user_id',user_id);
    console.log(formData)
    try {
        var result = await fetch(`${BasePath}wallet-details`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 

//Dashboard Apiss-----------------------------------------

export const LikeOrUnlikePost= async(userid, postid,status)=>{
  
    
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('post_id',postid);
    try {
        var result = await fetch(`${BasePath}${status}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

} 



export const LikeorUnlikeComment= async(userid, commentid,status)=>{
  
   
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('comment_id',commentid);
    try {
        var result = await fetch(`${BasePath}${status}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}


export const LikeorUnlikeReply= async(userid, commentid,status)=>{
  
   
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('reply_id',commentid);
    try {
        var result = await fetch(`${BasePath}${status}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}




export const SendMyCommentOnPost= async(userid, postid,comment)=>{
  
   
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('post_id',postid);
    formData.append('comment',comment);

    try {
        var result = await fetch(`${BasePath}comment-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const SendMyCommentOnReply= async(userid, postid,comment)=>{
  
   
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('comment_id',postid);
    formData.append('reply',comment);

    try {
        var result = await fetch(`${BasePath}reply-comment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const GetCommentReplies= async(userid,CommmentId)=>{
  
   
    const formData = new FormData();
    formData.append('user_id',userid);
   
    formData.append('comment_id',CommmentId);

    try {
        var result = await fetch(`${BasePath}comment-replies`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}
export const CreateGroup= async(user1,user2)=>{
  
   
    const formData = new FormData();
    formData.append('user1',user1);
   
    formData.append('user2',user2);

    try {
        var result = await fetch(`${BasePath}create-group`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const GetGroups= async(user1)=>{
  
  
    const formData = new FormData();
    formData.append('user_id',user1);

    try {
        var result = await fetch(`${BasePath}get-groups`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const GetChatFromRoomId= async(roomid)=>{
  
  
    const formData = new FormData();
    formData.append('group_id',roomid);
   
   

    try {
        var result = await fetch(`${BasePath}get-chat`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}


export const AddtoFavouritePost= async(userid, postid,status)=>{
  
    
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('post_id',postid);
    try {
        var result = await fetch(`${BasePath}addremove-to-favorite-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const CreateReview= async(userid, Businessid,review)=>{
  
    
    const formData = new FormData();
    formData.append('user_id',userid);
    formData.append('business_id',Businessid);
    formData.append('review',review);

    try {
        var result = await fetch(`${BasePath}review`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}


export const UserReportTypes = async()=>{
   
   
    // formData.append('notification',status);
    try {
        var result = await fetch(`${BasePath}user-report-list`)
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}
export const PostReportTypes = async()=>{
   
   
    // formData.append('notification',status);
    try {
        var result = await fetch(`${BasePath}report-list`)
        
        return  result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

// export const seenAll = async(group_id, user_id)=>{
//     const formData = new FormData();
//       formData.append('group_id', group_id);
//       formData.append('user_id', user_id);

//       // console.log(formData);
//       try {
//           var result = await fetch(`${ChatBasePath}seen-chat`, {
//               method: "POST",
//               headers: {
//                   Accept: "application/json",
//                   "Content-Type": "multipart/form-data",
//               },
//               body: formData,
//           })
//           return result.json()
//       } catch (e) {
//           return e
//       }

// } 

// export const getEmojiFromApi = async() => {
    
//     var result = await fetch(`${ChatBasePath}emojis`)
//     return result.json()
//     // if(resultJson.error==false){
//     //     // console.log();
//     //     return resultJson.emojis
//     // }
//   };

////////////////////Tab -----5 (menu)/////////////////////Edit Profile Apis
//Screen Edit Profile


export const RemoveOtherPosts = async( user_id,postid,reportType,reason)=>{
    
    const formData = new FormData();
    formData.append('user_id',user_id);
    formData.append('post_id',postid);
    formData.append('report_id',reportType);
    formData.append('report_message',reason);

   
    try {
        var result = await fetch(`${BasePath}report-post`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
       console.log(result.json())
    } catch (e) {
        console.log(e)
        return e
    }

}


export const RemoveOtherUser = async( user_id,otheruserid,reportType,reason)=>{
   
    const formData = new FormData();
    formData.append('reporter_id',user_id);
    formData.append('abuser_id',otheruserid);
    formData.append('category_id',reportType);
    formData.append('report_message',reason);

   
    try {
        var result = await fetch(`${BasePath}report-user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
       return result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}

export const BlockUser = async( user_id,otheruserid)=>{
   
    const formData = new FormData();
    formData.append('user_id',user_id);
    formData.append('blocked_user_id',otheruserid);
  

   
    try {
        var result = await fetch(`${BasePath}block-user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
       
       return result.json()
    } catch (e) {
        console.log(e)
        return e
    }

}