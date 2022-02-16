import Mock, {Random,} from 'mockjs';

const avatar = {
  'title': '@ctitle',
  'image': Random.image(
    '60x60',
    Random.color(),
    Random.color(),
    'png',
    Random.paragraph(3)
  ),
};

const getAvatar = Mock.mock({

})

export default [
  {
    url: '/api/getAvatar',
    method: 'GET',
  }
]