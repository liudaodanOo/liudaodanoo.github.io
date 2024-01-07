<script setup>
  import { ref } from 'vue';

  const publicList = [
    {
      name: '公司邮箱',
      link: 'https://dwm8.digiwin.com/coremail/'
    },
    {
      name: 'EasyFlow GP',
      link: 'http://efgpcn.digiwin.com/NaNaWeb/GP//ForwardIndex?hdnMethod=findIndexForward'
    },
    {
      name: '部门分享人员清单',
      link: 'https://docs.qq.com/sheet/DVG9ZZkZpbFdaWWVT?tab=BB08J2'
    }
  ];

  const fileList = ref([]);
  onMounted(() => {
    const baseURL = location?.origin;
    fileList.value = [
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
  })

  const onClick = (link) => {
    window.open(link);
  }
</script>

<h1>资源</h1>
<h2>公共</h2>
<ul>
  <li v-for="(item) of publicList" :key="item.link" :data-href="item.link">
    <a @click="onClick(item.link)">{{item.name}}</a>
  </li>
</ul>

<h2>规范文档</h2>
<ul>
  <li v-for="(item) of fileList" :key="item.link" :data-href="item.link">
    <a @click="onClick(item.link)">{{item.name}}</a>
  </li>
</ul>

<style module>
  a {
    cursor: pointer;
  }
</style>
