  <template>
  <div>
    <el-form :model="model" ref="model" inline>
      <el-table :data="model.tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="280">
          <template slot-scope="scope">
            <span v-if="scope.row.flag">{{scope.row.name}}</span>
            <el-form-item
              label=" "
              v-else
              :prop="`tableData.${scope.$index}.name`"
              :rules="rules.name"
            >
              <el-input placeholder="请输入类别名称" v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot-scope="scope">
            <span v-if="scope.row.flag">{{scope.row.address}}</span>
            <el-form-item
              label=" "
              v-else
              :prop="`tableData.${scope.$index}.address`"
              :rules="rules.address"
            >
              <el-input placeholder="请输入类别名称" v-model="scope.row.address"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" class="el-icon-plus" @click="add">增加行</el-button>
      </el-col>
      <el-col :span="4" :offset="16">
        <el-button type="primary" @click="save">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

  <script>
export default {
  created() {
    for (let i = 0; i < 3; i++) {
      this.model.tableData.push({
        name: "张" + i,
        date: "2019-09-0" + i,
        address: "朝阳区潮驿178--" + (i + 3) * 2 + "层",
        flag: true
      });
    }
  },
  data() {
    return {
      model: {
        tableData: []
      },
      rules: {
        name: [
          { required: true, message: "这个姓名还没输入", trigger: "blur" }
        ],
        address: [
          { required: true, message: "这个地址还没输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    add() {
      console.log(123);
      this.model.tableData.push({
        date: "",
        name: "",
        address: ""
      });
    },
    save() {
      console.log("保存");
      this.$refs["model"].validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>
  <style>
#table table {
  margin: 0;
}
</style>