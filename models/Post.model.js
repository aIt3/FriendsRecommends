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
	Reactions: {
		type: Schema.Types.ObjectId,
		// this refers to the model the id above belongs to
		ref: 'User',
        emoji: String
	}
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;