<template>
    <div id="vcomments"></div>
</template>
<script>
export default {
    date(){
        return{
            Valine:""
        }
    },
    mounted(){
        import('valine').then(res=>{
            console.log('res',res);
            this.Valine=res.default
            this.init()
        })
    },
    methods:{
        init(){
            new this.Valine({
                el:'#vcomments',
                appId:'tCxkNWXplOhMs6XuQ5IEpbQL-gzGzoHsz',
                appKey:'vMTI4iSCUH1jSMiVx38YuO8t',
                avatar:"wavatar",
                visitor:true,
                placeholder:'留言板。。。'
            })
        }
    }
}
</script>