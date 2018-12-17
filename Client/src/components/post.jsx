import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'


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
        this.reblogable = this.reblogable.bind(this);
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

    //handles all known post types. Text-type is handled by default, so is not listed here.
    filterPostType() {
        if (this.state.post.type === "photo"){
            return(
                <div className="post" style={{padding:'0px'}}>
                        {this.state.post.photos.map((photo, index) => {
                            return (<img key={index} id="photos" src={photo.original_size.url}/>)
                        })}
                </div>
            )
        }
        else if (this.state.post.type === "answer"){
            return(
                    <div>
                        <div className="questionObject" style={{width:'100%'}}>
                            <ul style={{display:'table', width:'100%'}}>
                                <li className="questionli"><img src="https://assets.tumblr.com/images/anonymous_avatar_96.gif" style={{maxWidth:'36px'}}/></li>
                                <li className="questionli" style={{width:'80%'}}>
                                    <div className="question">
                                        <span style={{color:"#888888"}}>
                                            <a style={{fontWeight:"bold"}} href={this.state.post.asking_url}>{this.state.post.asking_name}</a> asked: 
                                        </span><br/> {this.state.post.question}
                                    </div>
                                </li >
                            </ul>
                        </div>
                    </div>
            )
        }
        else if (this.state.post.type === "link"){
            return(
                    <div>
                        <img id="photos" src={this.state.post.link_image}/>
                        <a href={this.state.post.url} style={{fontWeight:'bold',textDecoration:'none',color:'black'}}>{this.state.post.title}</a>
                    </div>
            )
        }
        else if (this.state.post.type === "audio"){
            return(
                <div>
                     <div dangerouslySetInnerHTML={{__html: this.state.post.player}}/>
                </div>
            )
        }
        else if (this.state.post.type === "quote"){
            return(
                <div>
                    <div dangerouslySetInnerHTML={{__html: this.state.post.text}}/>
                </div>
            )
        }
        else if (this.state.post.type === "chat"){
            let chat = this.state.post.body.split(/\r?\n/);
            return(
                <div>
                    {chat.map((c, index) => {
                        return(<div key={index}>{c}</div>)
                    })}
                <br/>
                </div>
            )
        }
        else if (this.state.post.type === 'video'){
            return(
                <video controls>
                    <source src={this.state.post.video_url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )
        }
    }

    //checks to see if the post has reblog data, and adds it to the post if so
    reblogable() {
        if (this.state.post.reblog && (this.state.post.reblog.comment !=='' || this.state.post.reblog.tree_html !=='' )){
            return(
                <div>
                   <div style={{fontWeight:'normal', padding:'10px'}} dangerouslySetInnerHTML={{__html: this.state.post.reblog.comment}}/>
                    <div style={{fontWeight:'normal', padding:'10px'}} dangerouslySetInnerHTML={{__html: this.state.post.reblog.tree_html}}/>
                </div>
            )
        }
        else if (this.state.post.type === 'text'){
            if (this.state.post.body !== ''){
                return(
                    <div style={{fontWeight:'normal', padding:'10px'}} dangerouslySetInnerHTML={{__html: this.state.post.body}}/>
                )
            }
            else if (this.state.post.title !== ''){
                return(
                    <div>{this.state.post.title}</div>
                )
            }
        }
    }
    
    render () {
        return (
            <div className="post" >
                {this.favoriteButton()}
                {this.filterPostType()}
                {this.reblogable()}
                <div style={{textAlign:'left'}}>
                    {this.state.post.tags.map((tag, index) => {
                        return(<span key={index} style={{color:'gray', padding:'10px', paddingBottom:'20px'}}> {tag} </span> )
                    })}
                </div>

            </div>
        )
    }   
}

export default Post;