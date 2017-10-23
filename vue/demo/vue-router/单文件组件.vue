<template>
  <p>
    {{ greeting }} world</p>
</template>

<<script>
module.exports = {
  data(){
    return {
      greeting :'hello'
    }
  }
}
</script>


<style lang="sass" scoped>
p{
  font-size:2em;
  text-align:center;
}
</style>


