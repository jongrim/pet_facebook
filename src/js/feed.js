import axios from 'axios';
import moment from 'moment';

class Feed {
  constructor() {
    // DOM cache
    this.$postText = $('#postText');
    this.$postSubmit = $('#postSubmit');
    this.$postContainer = $('#postContainer');

    this.$postSubmit.click(this.newPost.bind(this));
    this.getPosts();
  }

  newPost(e) {
    let origin = location.origin;
    axios
      .post(`${origin}/feed`, {
        postText: this.$postText.val()
      })
      .then(result => {
        console.log(result);
        this.insertPost(
          result.data.textContent,
          moment(result.data.createdAt, moment.ISO_8601).format(
            'MMM, Do @ h:mm a'
          ),
          result.data.UserId
        );
      });
  }

  getPosts() {
    let origin = location.origin;
    axios.get(`${origin}/api/post`).then(result => {
      console.log(result);
    });
  }

  insertPost(postTextContent, postTime, user) {
    let origin = location.origin;
    axios.get(`${origin}/api/user/${user}`).then(result => {
      console.log(result);
      let { data } = result;
      let post =
        `<div id="postContainer">` +
        `<div class="card mb-3">` +
        `<div class="card-body">` +
        `<p class="card-text">` +
        `${postTextContent}` +
        `</p>` +
        `<p class="blockquote-footer"><a href="profile/${user}">${data.first_name} ${data.last_name}</a>, ${postTime}</p>` +
        `<div class="btn-group" role="group" aria-label="Post actions">` +
        `<button class="btn btn-link">Like</button><button class="btn btn-link">Comment</button>` +
        `</div>` +
        `</div>` +
        `</div>`;

      this.$postContainer.prepend(post);
    });
  }
}

export default Feed;
