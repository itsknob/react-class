// Actions
import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  // redux thunk sees function and dispatches action
  return function(dispatch) {
    //fetch("/api/v1/current_user")
    //axios.get('https://rallycode.herokuapp.com/api/music_albums')
    axios.get("/api/v1/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};