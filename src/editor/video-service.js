window.videoIdCount=100,window.youtubeRegexPattern=/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?\."'<]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?\."'<]{11,})/.source;window.videoService=new class{constructor(){this.YOUTUBE_URL_PREFIX="https://www.youtube.com/watch?v=",this.THUMBNAIL_URL_PREFIX="https://i.ytimg.com/vi/",this.THUMBNAIL_URL_SUFFIX="/default.jpg",this.youtubeServiceURL="https://www.youtube.com",this.PLAYLIST_LIMIT=50}async fetchVideo(t){let e="",i="",o=sessionStorage.getItem(t);if(o)({title:e,channel:i}=JSON.parse(o));else try{const o=await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${t}`),s=await o.json();e=s.title,i=s.author_name,sessionStorage.setItem(t,JSON.stringify({title:e,channel:i}))}catch(t){console.log(t)}return{id:window.videoIdCount++,videoId:t,url:this.YOUTUBE_URL_PREFIX+t,title:e,channel:i,thumbnailUrl:this.getVideoThumbnailUrl(t)}}getVideoThumbnailUrl(t){return t?this.THUMBNAIL_URL_PREFIX+t+this.THUMBNAIL_URL_SUFFIX:null}parseYoutubeId(t){const e=RegExp(window.youtubeRegexPattern,"i").exec(t);return e&&e.length>1?e[1]:null}parseYoutubeIds(t){let e,i=[];const o=RegExp(window.youtubeRegexPattern,"ig");for(;e=o.exec(t);)i.push(e[1]);return i}async generatePlaylist(t){const e=await window.generatePlaylistId(),i=new Date;return{id:e,title:i.toLocaleString(),videos:t||[],timestamp:i.getTime()}}openPlaylistEditor(t){const e=location.hash.length>0?location.hash.substring(1):"/";history.pushState({playlist:t,previousPage:e},"","#/editor"),window.dispatchEvent(new Event("hashchange"))}async openPlaylist(t){const e=[...t],i=new Array(Math.ceil(e.length/this.PLAYLIST_LIMIT)).fill().map((t=>e.splice(0,this.PLAYLIST_LIMIT))),o=await window.getSettings();await Promise.all(i.map((async t=>{const e=t.join(",");let i=`https://www.youtube.com/watch_videos?video_ids=${e}`;if(o.openPlaylistPage){i=`${this.youtubeServiceURL}/watch_videos?video_ids=${e}`;const t=await(await fetch(i)).text(),o=/og:video:url[^>]+\?list=([^"']+)/.exec(t);o&&o.length>1?i="https://www.youtube.com/playlist?list="+o[1]:alert("Unable to retrieve playlist id. Directly playing videos instead...")}if("undefined"!=typeof browser)return browser.tabs.create({url:i});window.open(i,"_blank")})))}};
