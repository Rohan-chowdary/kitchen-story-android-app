import ConfigApp from "./ConfigApp";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LIMIT_ITEMS = 10;
const RECENT_LIMIT = 10;
const FEATURED_LIMIT = 10;

////////////////////////////////// API

export async function getFeaturedRecipes(){
  try {
    const url = `${ConfigApp.URL}json/data_recipes.php?featured=1&page=1&limit=${FEATURED_LIMIT}&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLatestRecipes(page){
  try {
    const url = `${ConfigApp.URL}json/data_recipes.php?page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getRecipeById(id){
  try {
    const url = `${ConfigApp.URL}json/data_recipes.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getRecipesByCategory(id, page){
  try {
    const url = `${ConfigApp.URL}json/data_recipes.php?category=${id}&page=${page}&limit=${LIMIT_ITEMS}&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getRecipesByAuthor(id, page){
  try {
    const url = `${ConfigApp.URL}json/data_recipes.php?author=${id}&page=${page}&limit=6`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedCategories(){
  try {
    const url = `${ConfigApp.URL}json/data_categories.php?featured=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function searchApi(query, page){

  const url = `${ConfigApp.URL}json/data_recipes.php?query=${query}&page=${page}&limit=${LIMIT_ITEMS}`;

  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function getMembers(page){

  const url = `${ConfigApp.URL}json/data_members.php?page=${page}&limit=${LIMIT_ITEMS}`;
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}


export async function getFavorites(id, page){
  try {
    const url = `${ConfigApp.URL}json/data_favorites.php?user=${id}&page=${page}&limit=${LIMIT_ITEMS}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeed(id, page){
  try {
    const url = `${ConfigApp.URL}json/data_feed.php?user=${id}&page=${page}&limit=${LIMIT_ITEMS}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getComments(item, page){
  try {
    const url = `${ConfigApp.URL}json/data_comments.php?item=${item}&page=${page}&limit=${LIMIT_ITEMS}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getReplies(id, page){
  try {
    const url = `${ConfigApp.URL}json/data_replies.php?id=${id}&page=${page}&limit=3`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getMemberById(id){
  try {
    const url = `${ConfigApp.URL}json/data_members.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getStrings(){

  const url = `${ConfigApp.URL}json/data_strings.php`;
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    
  }
}

////////////////////////////////// Like & Follow System

export const submitComment = async (id, user, action, body, comment) => {

  const url = `${ConfigApp.URL}json/data_comment.php`;
    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: action,
                comment_item: id,
                comment_user: user,
                comment_text: body,
                comment_id: comment

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export async function checkLike(user, item){
  try {
    const url = `${ConfigApp.URL}json/data_checklike.php?user=${user}&item=${item}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export const submitLike = async (user, item) => {

  const url = `${ConfigApp.URL}json/data_like.php`;
    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'like',
                user_id: user,
                item_id: item

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export const submitUnLike = async (user, item) => {

  const url = `${ConfigApp.URL}json/data_like.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'unlike',
                user_id: user,
                item_id: item

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export async function checkFollow(user, follower){

  try {
    const url = `${ConfigApp.URL}json/data_checkfollow.php?user=${user}&follower=${follower}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export const submitFollow = async (user, follower) => {

  const url = `${ConfigApp.URL}json/data_follow.php`;
    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'follow',
                user_id: user,
                follower_id: follower

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export const submitUnFollow = async (user, follower) => {

  const url = `${ConfigApp.URL}json/data_follow.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'unfollow',
                user_id: user,
                follower_id: follower

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

////////////////////////////////// Authentication


export const checkUserApi = async (email) => {

	const url = `${ConfigApp.URL}json/data_check.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_email: email,

            })
        })
        const json = await resp.json();
        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const restPassApi = async (email) => {

	const url = `${ConfigApp.URL}json/data_forgot.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_email: email,

            })
        })
        
        const json = await resp.json();

        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const signInApi = async (email, password) => {

	const url = `${ConfigApp.URL}json/data_signin.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_email: email,
                user_password: password

            })
        })
        const json = await resp.json();

        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const contactForm = async (name, email, message) => {

  const url = `${ConfigApp.URL}json/contact_form.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: name,
                user_email: email,
                user_message: message
            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export const signUpApi = async (name, email, password) => {

	const url = `${ConfigApp.URL}json/data_signup.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_name: name,
                user_email: email,
                user_password: password

            })
        })
        const json = await resp.json();
        

        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const signOutApi = async () => {

	try {
		await AsyncStorage.removeItem("isLogged");
		await AsyncStorage.removeItem("userData");
	} catch (error) {
		//console.log("Error", error);
	}

}

export const getLogged = async () => {
	try {
		const isLogged = await AsyncStorage.getItem("isLogged");
		return isLogged;
	} catch (error) {
		//console.log("Error", error);

	}
}

export const setLogged = async (value) => {
	try {
		await AsyncStorage.setItem("isLogged", `${value}`);
	} catch (error) {
		//console.log("Error", error);
	}

}

export const setUserData = async (user) => {

	try {
		await AsyncStorage.setItem("userData", JSON.stringify(user));
	} catch (error) {
		//console.log("Error", error);
	}

}

export const getUserData = async () => {

	try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      return data;
	} catch (error) {
		//console.log("Error", error);
	}
}

////////////////////////////////// Favorites

export const setRecipeBookmark = async (item, id) => {

  try {

  await AsyncStorage.getItem('recipesFav').then(response => {

    const res = JSON.parse(response);

    if (res !== null) {
      let data = res.find(e => e.id === res.id);
      if (data == null) {
        res.push(item);
        AsyncStorage.setItem('recipesFav', JSON.stringify(res));
      }
    } else {
      let data = [];
      data.push(item);
      AsyncStorage.setItem('recipesFav', JSON.stringify(data));

    }

  });

    return true;

  } catch (error) {
    //console.log("Error", error);
  }

}

export const removeRecipeBookmark = async (id) => {

  try {

     const data = await AsyncStorage.getItem('recipesFav').then(token => {
     const res = JSON.parse(token);
     return res.filter(e => e.id !== id);

  });

   await AsyncStorage.setItem('recipesFav', JSON.stringify(data));
   return true;
   
  } catch (error) {
    //console.log("Error", error);
  }

}

export const getFavrecipes = async () => {

  try {
      let items = await AsyncStorage.getItem("recipesFav");
      let data = JSON.parse(items);
      return data;
  } catch (error) {
    //console.log("Error", error);
  }
}