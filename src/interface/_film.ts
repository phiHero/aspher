export interface _filmData {
  _id: string;
  title: string;
  like: string[];
  dislike: [];
  episode: _episodeData[];
  isRecommended: true;
  genre: string[];
  year: number;
  desc: string;
  titleImg: string;
  backgroundImg: string;
  trailer: string;
  isMovie: boolean;
  length: number;
}

export interface _episodeData {
  _id: string;
  name: string | number;
  video: string;
}
