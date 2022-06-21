import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome} from '@expo/vector-icons'; 
import { BookMarkIcon } from '../assets/SvgIcons/AllIcons';
import { AddtoFavouritePost } from '../Screens/Services/Authentication';
 export default function BookmarkPost  ({params,bookmarked,Postid,id})  {
   const [PostMark,IsPostMark]=useState(bookmarked)
   const MarkPost=async()=>{
   
    await AddtoFavouritePost(id,Postid)
   
  }


    return(
    <TouchableOpacity onPress={()=>{IsPostMark(!PostMark),MarkPost() }}>
        {PostMark?
            <FontAwesome name="bookmark" size={24} color="#FC9919" />
            :
            <FontAwesome name="bookmark-o" size={24} color="black" />
            // <BookMarkIcon/>
        }
    </TouchableOpacity>
   )
};





 BookmarkPost