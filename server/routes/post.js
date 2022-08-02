const { Router } = require('express');
const { Post, User } = require('./../models');
const asyncHandler = require('./../utils/async-handler');

const router = Router();

// get 요청
// 게시글 현재 페이지와, 보여줄 게시글 갯수 필요 
router.get('/', async (req, res, next) => {

  // let page = 1;
  // let perPage = 6;
  if (req.query.page < 1) {
    // page가 1보다 작다면 오류처리
    next('Please enter a number greater than 1'); 
    return ;
  }

  // req.query.page가 null or undefined면 1을 넣어라. 
  // 즉 default 가 1
  const page = Number(req.query.page || 1); 

  const perPage = Number(req.query.perPage || 6);

  const total = await Post.countDocuments({});

  const posts = await Post.find({})
    .sort({createdAt: -1})// 마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
    .skip(perPage * (page -1)) // ex) 2페이지라면 5번부터 
    .limit(perPage) // 6개씩 가져옴
    .populate('author'); 

  const totalPage = Math.ceil(total / perPage);

  // const posts = await Post
  //   .find({})
  //   .populate('author');
  
  res.json({ posts, totalPage });
});

// post 요청
router.post('/', async (req, res, next) => {
  const { img, title, content, email } = req.body;
  console.log(img, title, content, email)
  try {
    const authData = await User.findOne({ email });
    // 저장된 document 객체 줌
    await Post.create({
      img,
      title,
      content,
      author: authData,
    });

    res.json({
      result: '저장이 완료 되었습니다.'
    });

  } catch (e) {
    next(e);
  }
});

// delete
router.get('/:shortId/delete', async (req, res, next) => {
  const { shortId } = req.params;

  try {
    await Post.deleteOne({ shortId });
    
    res.json({
      result: '삭제가 완료 되었습니다.'
    });

  } catch (e) {

    next(e);

  }

});

// find
router.get('/:shortId/find', async (req, res, next) => {
  const { shortId } = req.params;

  try {
    let data = await Post.findOne({ shortId });

    res.json(data);
    
  } catch (e) {

    next(e);
  }
});

// update
router.post('/:shortId/update', async (req, res, next) => {
  const { shortId } = req.params;
  let { title, content } = req.body;

  try {
    await Post.updateOne({ shortId }, { title, content });

    res.json({
      result: '수정이 완료 되었습니다.'
    });
  } catch (e) {

    next(e);
  }
});

module.exports = router;