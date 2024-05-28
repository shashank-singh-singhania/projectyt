import mongoose, { Schema } from 'mongoose';
// import Video from './Video'; // Ensure the correct path to your Video model
import Video from './video.model';

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    link: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    img:{ type: String, required: true },
  },
  { timestamps: true }
);

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);

export default Playlist;
