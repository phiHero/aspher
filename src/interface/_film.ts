export interface _filmData {
  _id: string;
  title: string;
  otherName: string;
  like: string[];
  dislike: string[];
  episode: _episodeData[];
  adminRecommended: true;
  genre: string[];
  year: number;
  desc: string;
  titleImg: string;
  backgroundImg: string;
  trailer: string;
  isMovie: boolean;
  length: number;
  followed: number;
}

export interface _episodeData {
  _id: string;
  name: string | number;
  video: string;
  subtitle: string;
}
export interface _filmListItem {
  _id: string;
  title: string;
  episode: string[];
  backgroundImg: string;
  trailer: string;
  updatedAt: string;
}
