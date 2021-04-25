
import { postsReducer } from "./app/state/post.reducer";
import { PostsState } from "./app/state/post.state";


export interface AppState{
    posts : PostsState
}

export const appReducer={

    posts : postsReducer,
}