import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

import Spotify from '../../util/Spotify';
import logo from './logo.jpg';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      searchResults:[],
      playlistName:'My Playlist',
      playlistTracks:[]
    }
    this.addTrack=this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist=this.savePlaylist.bind(this)
    this.search=this.search.bind(this)
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id ===track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks=this.state.playlistTracks;
    tracks=tracks.filter(currentTrack=> currentTrack.id !==track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    //step 63
    const trackUris = this.state.playlistTracks.map(track =>track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  //67, 88
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render(){
    return (
      <div>
        <div class="header-row">
          <div class="header-col1">
            <img class="header-img" src={logo} />

          </div>
          <div class="header-col2">
            <div class="col-text2"> Creater: Cathy Tsui  |  Email: cathytsui.git@gmail.com </div>
          </div>
        </div>
        <div className="App">{

           <SearchBar onSearch={this.search}/>
        }
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                          onAdd={this.addTrack}/>

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>


          </div>
        </div>
      </div>
    )
  }
}

export default App;
