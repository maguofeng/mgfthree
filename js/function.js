function getClass(classname,father){
	father=father||document;
	if(father.getElementsByClassName){
		return father.getElementsByClassName(classname)
	}else{
		var all=father.getElementsByTagName("*");
		var newarr=[];
		for(var i=0;i<all.length;i++){
			if(checkRep(all[i].className,classname)){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
function checkRep(str,classname){
	var arr=str.split(" ");	
	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return true;
		}
	}
	return false;
}
/***********************************/
//获取样式的兼容格式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return parseInt(obj.currentStyle[attr])
	}else{
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}
/***********************************/
//获取元素
function $(selector,father){
	father=father||document;
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/,"")
		if(selector.charAt(0)=="."){
			return getClass(selector.substring(1),father);
		}else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){
			return father.getElementsByTagName(selector);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selector)){
            selector=selector.slice(1,-1);
			return document.createElement(selector);
		}
	}else if(typeof selector=="function"){
		
		window.onload=function(){
			selector();
		}
	}
}
/***********************************/
//获取子节点兼容问题
function getChilds(father){
	var childs=father.childNodes;
	var newarr=[];
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1){
			newarr.push(childs[i]);
		}
	}
	return newarr;
}
/***********************************/
//获取第一个子节点兼容问题
function getFirst(father){
	return getChilds(father)[0];
}
/***********************************/
//获取最后一个子节点兼容问题
function getLast(father){
	return getChilds(father)[getChilds(father).length-1];
}
/***********************************/
//获取指定位置子节点
function getNum(father,num){
	return getChilds(father)[num];
}
/***********************************/
//获取下一个兄弟节点兼容问题
function getNext(nodeObj){
	var next=nodeObj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
}
/***********************************/
//获取上一个兄弟节点兼容问题
function getPre(nodeObj){
	var pre=nodeObj.previousSibling;
	if(pre==null){
		return false;
	}
	while(pre.nodeType==3||pre.nodeType==8){
		pre=pre.previousSibling;
		if(pre==null){
			return false;
		}
	}
	return pre;
}
/***********************************/
//将元素插入到另一个元素之后
function insertBefore(newObj,nowObj){
	var parent=nowObj.parentNode;
	parent.insertBefore(newObj,nowObj);
}
//将元素插入到另一个元素之前
function insertAfter(newObj,nowObj){
	var nextSibling=getNext(nowObj);
	if(next){
		insertBefore(newObj,next);
	}else{
		nowObj.parentNode.appendChild(newObj);
	}
}
/***********************************/
//事件添加
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		obj.addEventListener(event,fun,false);
	}else{
		obj.attachEvent("on"+event,fun);
	}
}
//事件删除
function removeEvent(obj,event,fun){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false);
	}else{
		obj.detachEvent("on"+event,fun);
	}
}