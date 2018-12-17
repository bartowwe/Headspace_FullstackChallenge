import React from 'react';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: props.post,
            selected: props.checkFavorited(props.post.id),
        };
        this.handleFavorite = props.handleFavorite,
        this.filterPostType = this.filterPostType.bind(this);
        this.favoriteButton = this.favoriteButton.bind(this);
    }

    componentDidMount() {
    }

    //updates props whenever the parent component state values change
    componentWillReceiveProps(nextProps) {
        this.setState({ post: nextProps.post, selected: nextProps.checkFavorited(nextProps.post.id)});  
    }



    //activates and toggles the favorite button
    favoriteButton(){
        let post = this.state.post;
        if (!this.state.selected){
          return (
            <button className="favBut" onClick={() => {this.handleFavorite(post); this.setState({selected: !this.state.selected});}}>Add</button>
          )
        }
        return (
            <button className="favBut" onClick={() => {this.handleFavorite(post); this.setState({selected: !this.state.selected});}}>Remove</button>
        )
    }

    filterPostType() {
        if (this.state.post.type === "text"){
            return(
                <div className="post" >
                    {this.favoriteButton()}
                    <div dangerouslySetInnerHTML={{__html: this.state.post.body}}>
                    </div>
                </div>
            )
        }
        else if (this.state.post.type === "photo"){
            return(
                <div className="post" style={{padding:'0px'}}>
                        {this.favoriteButton()}
                        {this.state.post.photos.map((photo, index) => {
                            return (<img key={index} id="photos" src={photo.original_size.url}/>)
                        })}    
                </div>
            )
        }
        else if (this.state.post.type === "answer"){
            return(
                <div className="post">
                    {this.favoriteButton()}
                    <div>
                        <div className="questionObject" style={{width:'100%'}}>
                            <ul style={{display:'table', width:'100%'}}>
                                <li className="questionli"><img src="https://assets.tumblr.com/images/anonymous_avatar_96.gif" style={{maxWidth:'36px'}}/></li>
                                <li className="questionli" >
                                    <div className="question">
                                        <span style={{color:"#888888"}}>
                                            <a style={{fontWeight:"bold"}} href={this.state.post.asking_url}>{this.state.post.asking_name}</a> asked: 
                                        </span><br/> {this.state.post.question}
                                    </div>
                                </li >
                            </ul>
                        </div>
                        <div className="post" dangerouslySetInnerHTML={{__html: this.state.post.answer}}></div>
                    </div>

                </div>
            )
        }
    }
    
    render () {
        return (
            <div>{this.filterPostType()}</div>
        )
    }   
}

export default Post;