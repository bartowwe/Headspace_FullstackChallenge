import React from 'react';
import axios from 'axios';
import Post from './post.jsx';


class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            blogname: '',
            tag: '',
            posts: [],
            favorites: [],
        };
        this.fetchTumblrs = this.fetchTumblrs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleFavorite = this.handleFavorite.bind(this);
        this.checkFavorited = this.checkFavorited.bind(this);
    }

    componentDidMount() {
    }  
      
    //sends a request to the local server for blog/tag
    //if a bad request is send the 
    fetchTumblrs() {
        //preEmpties the posts, reseting the scroll bar
        this.setState({posts: []});
        axios
        .get('api/blog', {
            params: {
                blogname: this.state.blogname,
                tag: this.state.tag,
            }
          })
        .then((data) => {
            let p = [];
            if (data.data.posts !== undefined){
                for (let i=0; i<data.data.posts.length; i++){
                    p.push(data.data.posts[i])
                }
            }
            else if (data.data !== undefined){
                for (let i=0; i<data.data.length; i++){
                    p.push(data.data[i])
                }
            }
            console.log(p);
            this.setState({posts: p})
        })
        .then(() => {
            console.log('heres the data: ', this.state.posts);
        })
        .catch(err => {console.error(err); this.setState({posts: []}) })
    }

    //handling search bar typing
    handleChange(event) {
        let stateObject = function() {
            let returnObj = {};
            returnObj[this.target.name] = this.target.value;
               return returnObj;
        }.bind(event)();
        this.setState( stateObject ); 
    }

    //handling submit button
    handleSubmit(event) {
        console.log(this.state);
        this.fetchTumblrs();
        event.preventDefault();
    }

    //handles the favoriting process, which is passed down to the post component
    handleFavorite(post){
        let tempFavs = this.state.favorites;
        for(let i = 0; i < this.state.favorites.length; i++)
        {
        if (this.state.favorites[i].id === post.id)
            {
            tempFavs.splice(i,1);
            this.setState({favorites: tempFavs});
            console.log('favs are: ', this.state.favorites);
            return;
            }
        }
        tempFavs.push(post);
        this.setState({favorites: tempFavs});
        console.log('favs are: ', this.state.favorites);
    }

    //checks to see if the post in question is favorited so it knows which button to render
    checkFavorited(post) {
        for(let i = 0; i < this.state.favorites.length; i++)
        {
        if (this.state.favorites[i].id === post)
            {
            return true
            }
        }
        return false
    }
      
    
    render () {
        return (
            <div>
                <div className="header">Tumblr Collector</div>
                <div className="container" style={{background:'pink'}}>
                    <div className="leftColumn">
                        <div className="searchBar">
                            <form onSubmit={this.handleSubmit}>
                                <ul style={{marginLeft:'none'}}>
                                    <li id="form">
                                        Blog Name: <br/>
                                        <input type="text" className="searchbox" name="blogname" autoComplete="off" value={this.state.value} onChange={this.handleChange}/>
                                    </li>
                                    <li id="form">
                                        Tag: <br/>
                                        <input type="text" className="searchbox" name="tag" autoComplete="off" value={this.state.value} onChange={this.handleChange}/>
                                    </li>
                                    <input type="submit" value="Search"/>
                                </ul>
                            </form>
                        </div>
                        <div className="resultsBox">
                            <div className="results">
                                <div>
                                    {this.state.posts.map((post, index) => {
                                        return(<Post key={index} post={post} handleFavorite={this.handleFavorite} checkFavorited={this.checkFavorited}></Post>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightColumn">
                        <div className="favText">Favorites:</div>
                        <div className="fbox">
                            <div className="favorites"> 
                                <div>
                                    {this.state.favorites.map((post, index) => {
                                        return(<Post key={index} post={post} handleFavorite={this.handleFavorite} checkFavorited={this.checkFavorited}></Post>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        )
    }   
}

export default App;