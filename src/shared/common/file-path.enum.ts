export const GET_IMAGE = () => process.env.HOST_ACCESS + '/api/upload/';
export const USER_AVATAR_DEFAULT =
  'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1700667930/user_hoohlb.png';
export const NO_IMAGE = 'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1700667940/no-image_kiurep.png';
export const PROJECT_DOWNLOAD_LINK = () =>
  'http://' + process.env.HOST + ':' + process.env.PORT + '/api/projects/download/source-code/';
