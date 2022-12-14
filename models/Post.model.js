const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
	link: String,
	title: String,
    postedByUser: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    dateAdded: String,
    mediaType: String, 
    topic: [String],
	thumbsUp: Number,
	thumbsDown: Number
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;