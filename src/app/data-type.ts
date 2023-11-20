export interface signUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface userDetails{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface updateUserDetails{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createPassword: string;
}

export interface signIn {
  email: string;
  password: string;
}

export interface getMovieInfoList {
  id: string;
  imgPath: string;
  movieName: string;
  duration: string;
  genre: string;
  rating: string;
  dataType: string;
}

export interface getMovieDetails {
  id: string;
  youtubeLink: string;
  movieName: string;
  genre: string;
  keyTheme: string;
  castName: string;
  directorName: string;
  isFavorite: boolean;
}

export interface getTerms {
  label: string;
  titleInfo: string;
  subTitleInfo_P1: string;
  subTitleInfo_P2_a: string;
  subTitleInfo_P2_b: string;
  contentTitle: string;
  contentInfo: string;
  outro_P1_a: string;
  outro_P1_b: string;
  supportFormLink: string;
}

export interface getPrivacy{
  titleInfo: string;
  subTitleInfo: string;
  contentTitle: string;
  contentInfo: string;
  outro: string;
  supportFormLink: string;
}

export interface getSubscription{
  contentTitle: string;
  contentSubtitle: string;
  contentInfo: string;
  cost: string;
  info: string;
}

export interface addToFavorite{
  userEmail: string;
  movieId: string;
  movieName: string;
  genre: string;
}