<template>
  <div>
    <el-dialog :visible.sync="displayDialog"
               width="765px" center
               :before-close="modalClose"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <div class="bkDialog" >
        <div class="dialogTitle">{{dialogTitle}}</div>
        <div style="float: left;width: 580px">
          <div class="inlineBlockInput" v-if="whatDialog === 'peopleUpdateBk'">
            <DetailInputTemplate inputName="姓名" :inputValue="currentRow.xm" unselectable="off" isReadonly="false"/>
            <DetailInputTemplate inputName="身份证" :inputValue="currentRow.sfzh" unselectable="off" isReadonly="false"/>
          </div>
          <div class="inlineBlockInput" v-if="whatDialog === 'peopleUpdateBk'" style="margin-top: 10px">
            <DetailInputTemplate inputName="手机号" :inputValue="currentRow.sjh" unselectable="off" isReadonly="false"/>
            <div style="display: inline-block;color: white;margin-left: 1rem">
              <div>性别</div>
              <el-radio v-model="isSex" label="1">男</el-radio>
              <el-radio v-model="isSex" label="2">女</el-radio>
            </div>
          </div>
          <div class="inlineBlockInput" v-if="whatDialog === 'carUpdateBk'">
            <div class="cphmDiv" style="display: inline-block">
              <div style="color: white">车牌号码</div>
              <div class="cphmSelect">
                <SelectTemplate :whatDialog="whatDialog" :updateDefalutValue="currentRow.hphm.substring(0,1)"  selectName="车牌号码" style="position: absolute" :list="cphList"/>
                <input class="hphm" type="text" v-model="carNumber" @blur="changeCarNum(carNumber)" />
              </div>
            </div>
            <SelectTemplate style="display: inline-block" selectName="车牌颜色" :list="bjzlList" :whatDialog="whatDialog" :updateDefalutValue="currentRow.hpysmc" :hpysCode="currentRow.hpys" />
          </div>
          <div class="inlineBlockInput" >
            <div style="margin-top: 10px">
              <div style="color: white">布控时段</div>
              <el-date-picker
                @change="handleTime"
                v-model="timeValue"
                type="daterange"
                align="right"
                size="small"
                value-format=" yyyy-MM-dd"
                format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="inlineBlockInput">
            <DetailInputTemplate inputName="联系人"   :whatDialog="whatDialog" :inputValue="currentRow.lxr" unselectable="off" isReadonly="false"/>
            <DetailInputTemplate inputName="联系电话" :whatDialog="whatDialog" :inputValue="currentRow.lxdh" unselectable="off" isReadonly="false"/>
            <DetailInputTemplate inputName="联系单位" :whatDialog="whatDialog" :inputValue="currentRow.lxdw" unselectable="off" isReadonly="false"/>
          </div>
          <div class="inlineBlockInput" style="margin-top: 10px">
            <DetailInputTemplate inputName="布控人" :whatDialog="whatDialog" :inputValue="currentRow.bkr" unselectable="off" isReadonly="false"/>
            <SelectTemplate selectName="布控单位" :list="bjzlList" :whatDialog="whatDialog" :updateDefalutValue="currentRow.bkdw" />
            <SelectTemplate selectName="布控类型" :list="bjzlList" :whatDialog="whatDialog" :updateDefalutValue="currentRow.bjzlmc" :bjzlCode="currentRow.bjzl" />
          </div>
          <div class="inlineBlockInput" style="margin-top: 15px">
            <div style="color: white;text-align: left">布控原因</div>
            <div>
              <el-input
                type="textarea"
                :clearable=true
                :rows="4"
                placeholder="请输入内容"
                @change="bkyyChange(bkyy)"
                v-model="bkyy">
              </el-input>
            </div>
          </div>
          <div class="btnAddBk" >
            <img @click="updateBk" src="../../assets/btn_saveBk.png" style="cursor: pointer" height="30" width="100"/>
          </div>
        </div>
        <div style="float: left;color: white" v-if="whatDialog === 'peopleUpdateBk'">
          <div>人员布控图片</div>
          <div class="rybktp">
            <el-upload
              class="upload-demo"
              drag
              name="zp"
              :show-file-list="false"
              :http-request="httpRequest"
              action="https://jsonplaceholder.typicode.com/posts/"
            >
              <img :src="upLoadImg" width="114" height="132" alt="">
            </el-upload>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DetailInputTemplate from '../detailInputTemplate/detailInputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  import {mapMutations, mapState} from 'vuex';
  export default {
    name: "update-bk-dialog",
    props: {
      displayDialog: {type: Boolean, default: false},
      currentRow: {},
      dialogTitle: {},
      whatDialog:{}
    },
    components:{
      DetailInputTemplate,
      SelectTemplate
    },
    data(){
      return{
        upLoadImg:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        isSex: '1',
        bjzlList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        timeValue: '',
        value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)],
        bkyy:'',
        width:114,
        height:132,
        cphList:[
          {value:'沪',name:'沪'},
          {value:'苏',name:'苏'},
          {value:'浙',name:'浙'},
          {value:'皖',name:'皖'},
          {value:'京',name:'京'},
          {value:'津',name:'津'},
          {value:'冀',name:'冀'},
          {value:'晋',name:'晋'},
          {value:'蒙',name:'蒙'},
          {value:'辽',name:'辽'},
          {value:'吉',name:'吉'},
          {value:'黑',name:'黑'},
          {value:'闽',name:'闽'},
          {value:'赣',name:'赣'},
          {value:'鲁',name:'鲁'},
          {value:'豫',name:'豫'},
          {value:'鄂',name:'鄂'},
          {value:'湘',name:'湘'},
          {value:'粤',name:'粤'},
          {value:'桂',name:'桂'},
          {value:'琼',name:'琼'},
          {value:'渝',name:'渝'},
          {value:'川',name:'川'},
          {value:'贵',name:'贵'},
          {value:'云',name:'云'},
          {value:'藏',name:'藏'},
          {value:'陕',name:'陕'},
          {value:'甘',name:'甘'},
          {value:'青',name:'青'},
          {value:'宁',name:'宁'},
          {value:'新',name:'新'}
        ],
        carNumber:'',
        cphmColorList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
      }
    },
    mounted(){
      this.isSex = this.currentRow.xb;
      this.bkyy = this.currentRow.bkyy;
      this.timeValue = [this.currentRow.bksj, this.currentRow.bkjssj];
      if(this.whatDialog === 'peopleUpdateBk'){
        this.upLoadImg = this.currentRow.zp;
      }

    },
    methods:{
      ...mapMutations(['updatePeopleBkUpdate','updateCarBkUpdate']),
      modalClose(){
        this.$emit('update:displayDialog', false); // 直接修改父组件的属性
      },
      //时间改变赋值
      handleTime(e) {
        if (this.whatDialog === 'peopleUpdateBk') {
          console.log('修改人员修改布控时间');
          this.updatePeopleBkUpdate(['bksj',e[0]]);
          this.updatePeopleBkUpdate(['bkjssj',e[1]]);
        }else if(this.whatDialog === 'carUpdateBk'){
          console.log('修改人员修改布控时间');
          this.updateCarBkUpdate(['bksj',e[0]]);
          this.updateCarBkUpdate(['bkjssj',e[1]]);
        }
      },
      httpRequest (options) {
        console.log('进去了。。。');
        var that = this
        // 获取文件对象
        let file = options.file
        //判断图片类型
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
          var  isJPG =  true
        } else {
          isJPG =  false
        }
        // 判断图片大小
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传产品图片大小不能超过 2MB!')
        }
        // 创建一个HTML5的FileReader对象
        var reader = new FileReader();
        //创建一个img对象
        var  img = new Image();
        let filename = options.filename
        if (file) {
          reader.readAsDataURL(file)
        }
        if (isJPG && isLt2M) {
          reader.onload = (e) => {
            let base64Str = reader.result.split(',')[1]
            img.src = e.target.result;

            console.log(e.target.result);
            // base64地址图片加载完毕后执行
            img.onload = function () {
              // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
              var canvas = document.createElement('canvas');
              var context = canvas.getContext('2d');
              // 图片原始尺寸
              var originWidth = this.width;
              var originHeight = this.height;
              // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
              var maxWidth = 114, maxHeight = 130;
              // 目标尺寸
              var targetWidth = originWidth, targetHeight = originHeight;
              // 图片尺寸超过最大尺寸的限制
              if(originWidth > maxWidth || originHeight > maxHeight) {
                if(originWidth / originHeight > maxWidth / maxHeight) {
                  // 更改宽度，按照宽度限定尺寸
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
              }
              //对图片进行缩放
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              // 清除画布
              context.clearRect(0, 0, targetWidth, targetHeight);
              // 图片压缩
              context.drawImage(img, 0, 0, targetWidth, targetHeight);
              /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
              //压缩后的base64文件
              var newUrl = canvas.toDataURL('image/jpeg', 0.92);
              console.log('----------------');
              console.log(newUrl);
              that.upLoadImg=  newUrl;
              // that.Api.post("/app/uploadPicture",{ fileContent:newUrl})
              //   .then(res => {
              //     that.addRule.pictureUrl = res.data;
              //   })
              //   .catch(err => {
              //   })
            }
          }
        }
      },
      //获取布控原因的值
      bkyyChange(e){
        if(this.whatDialog === 'peopleUpdateBk'){
          this.updatePeopleBkUpdate(['bkyy',e])
        }else if(this.whatDialog === 'carUpdateBk')
          this.updateCarBkUpdate(['bkyy',e])
      },
      updateBk(){
        if(this.whatDialog === 'peopleUpdateBk'){
          this.updatePeopleBkUpdate(['xb',this.isSex]);
        //  this.peopleBkUpdateList 所有更新数据已经保存
        }
      }
    },
    computed:{
      ...mapState(['peopleBkUpdateList'])
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/dialog.less";
  @import "../../publicCss/publicCss.less";
  @import "../../publicCss/bkDialog.less";

</style>
