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
        this.$nextTick(()=>{
       
        import('valine').then(res=>{
            console.log('res',res);
            this.Valine=res.default
            this.init() 
            
        })
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
            document.getElementsByClassName('vpower')[0].style.display='none'
            document.getElementsByClassName('vcol-30')[3].style.visibility='hidden'
        }
    }
}
</script>