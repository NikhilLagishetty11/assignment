
import { state } from "@angular/animations"
import { createReducer, on } from "@ngrx/store"

import { addPost, deletePost, updatePost } from "./post.actions"
import { initialState } from "./post.state"


const _postsReducer = createReducer(initialState,
    on(addPost,(state,action)=>{
        let post = {...action.post}
        post.id = state.posts.length + 1
        return {
            ...state,
            posts:[...state.posts,post],
        };
    }),
    on(updatePost,(state,action)=>{
        const updatedPost = state.posts.map((post)=>{
            return action.post.id === post.id ? action.post : post
        })
        return{
            ...state,posts:updatedPost
        };
    }),
    on(deletePost,(state, {id})=>{
        const updatedPost = state.posts.filter((post)=>{
            return post.id !== id;
        });
        return {
        ...state,
        posts:updatedPost,
        }
    })

    );

    
export function postsReducer(state,action){
    return _postsReducer(state, action)
};