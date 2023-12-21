<script setup>
  const baseURL = location.origin;
  const fileList = [
    {
      name: '前端开发规范',
      link: baseURL + '/docs/digiwin/前端开发规范.docx'
    },
    {
      name: '后端开发规范',
      link: baseURL + '/docs/digiwin/后端开发规范.docx'
    },
    {
      name: '数据库设计规范',
      link: baseURL + '/docs/digiwin/数据库设计规范.pdf'
    }
  ];
  const onClick = (link) => {
    window.open(link);
  }
</script>

# 资源

## 公共

- [公司邮箱](https://dwm8.digiwin.com/coremail/)
- [EasyFlow GP](http://efgpcn.digiwin.com/NaNaWeb/GP//ForwardIndex?hdnMethod=findIndexForward)
- [部门分享人员清单](https://docs.qq.com/sheet/DVG9ZZkZpbFdaWWVT?tab=BB08J2)

## 规范文档

<ul>
  <li v-for="(item) of fileList" :key="item.link">
    <a @click="onClick(item.link)">{{item.name}}</a>
  </li>
</ul>

<style module>
  a {
    cursor: pointer;
  }
</style>
