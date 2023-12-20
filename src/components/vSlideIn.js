/*
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-06 15:40:08
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-14 16:26:36
 * @FilePath: \newbee-mall-vue3-app\src\components\vSildeIn.js
 * @Description: 滚动平滑上升逻辑代码
 */
//定义vSildeIn.js
const distance = 150;
const duration = 1500;
//WeakMap避免内存泄露
const animationMap = new WeakMap(); 
//监听元素是否与当前页面视口重叠，即判断元素是否出现于当前视口内，返回所有元素监听结果
const ob = new IntersectionObserver(entries=>{
	for(const entry of entries){
		//判断元素是否在视口内
		if(entry.isIntersecting){
			//获取当前在视口内的元素动画对象
			const animation = animationMap.get(entry.target);
			//开始执行动画
			animation.play();
			//执行完后取消监听，限制动画只播放一次，防止回滚时重复播放
			ob.unobserver(entry.target);
		}
	}
})

//判断元素是否在视口之下
function isBelowViewPort(el){
	const rect = el.getBoundingClientRect();
	return rect.top > window.innerHeight;
}

export default {
	mounted(el){
		if(!isBelowViewPort(el)){
			return;
		}
		const animation = el.animate([
			//配置关键帧start
			{
				transform: `translateY(${distance}px)`,
				opcaity: 0.5,
			},
			{
				transform: `translateY(0)`,
				opcaity: 1,
			}
			//配置关键帧end
		],{  
			//配置动画执行时间
			duration: duration,
			//配置动画时间函数
			easing: 'ease-in-out',
		});
		//起始状态暂停动画执行，待元素在视口范围内执行动画
		animation.pause();
		//将元素与对象绑定进行映射
		animationMap.set(el,animation);
		//监听动画是否与视口重叠
		ob.observe(el)
	},
	//元素卸载时取消监听
	unmounted(el){
		ob.unobserve(el);
	}
}
