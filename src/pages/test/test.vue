<template>
  <div class="tab-contents">
   
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Swipe from '../../components/Swipe.vue';
import mixin from '../../config/mixin';

@Component({
    components: {
        Swipe
    },
    mixins: [mixin]
})
export default class recommend extends Vue {
  active = 0;
    mounted() {
       console.log("测试页加载")
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/utils.scss';

.radios,
.playlists {
    margin: 14px 10px 10px;
    .title {
        color: #000;
        font-size: 16px;
        margin-bottom: 11px;
        font-weight: normal;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        .list-item {
            flex: 1;
            width: 45%;
            flex-basis: 40%;
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 10px;
            &:nth-child(2n + 1) {
                margin-right: 8px;
            }
            .list-media {
                position: relative;
                margin-bottom: 5px;
            }
            .list-info {
                height: 36px;
                padding: 0 7px 5px;
                color: #000;
                .list_tit {
                    @include ellipsis;
                }
            }
            .listen_count {
                position: absolute;
                left: 5px;
                bottom: 7px;
                line-height: 12px;
                color: #fff;
            }
            .icon {
                background-image: url('../../assets/list_sprite.png');
                background-repeat: no-repeat;
                background-size: 24px 60px;
            }
            .icon_listen {
                float: left;
                width: 10px;
                height: 10px;
                background-position: 0 -50px;
                margin-right: 5px;
            }
            .icon_play {
                height: 24px;
                bottom: 5px;
                right: 5px;
                width: 24px;
                position: absolute;
                background-position: 0 0;
            }
            img {
                width: 100%;
                display: block;
                min-height: 145px;
            }
        }
    }
}

.tab-contents {
    position: relative;
}
.loading {
    text-align: center;
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f4f4f4;
    img {
        height: 100px;
        width: 100px;
        margin-top: 127px;
    }
}
</style>
