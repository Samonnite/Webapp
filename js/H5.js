/*内容管理对象 */

var H5 = function(){
    this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    this.page=[];
    $('body').append(this.el);

    //新增一个页
    //name 组件的名称，会加入到ClassName中，
    //text 页内的默认文本
    this.addPage = function(name,text){
        var page = $('<div class="h5_page section">');

        if(name !=undefined){
            page.addClass('h5_page_'+name);
        }
        if(text != undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    }
    //新增一个组件
    this.addComponent = function(name,cfg){
        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        },cfg);
        var component;  //定义一个变量，存储 组件元素
        var page = this.page.slice(-1)[0];
		switch (cfg.type) {
			case 'base':
				component=new h5ComponentBase(name,cfg);
				break;
			case 'polyline':
				component=new h5ComponentPolyline(name,cfg);
				break;
			case 'pie':
				component=new h5ComponentPie(name,cfg);
				break;
			case 'bar':
				component=new h5ComponentBar(name,cfg);
				break;
			case 'bar_v':
				component=new h5ComponentBar_v(name,cfg);
				break;
			case 'radar':
				component=new h5ComponentRadar(name,cfg);
				break;
			case 'ring':
				component=new h5ComponentRing(name,cfg);
				break;
			case 'point':
				component=new h5ComponentPoint(name,cfg);
				break;
				
		}
        page.append(component);
        return this;
    }
	// h5 对象初始化
	this.loader=function(firstPage){
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction) {
				$(this).find('.h5_component').trigger('onLeave');

			},
			afterLoad:function(anchorLink,index) {
				$(this).find('.h5_component').trigger('onLoad');
				conaole.log($(this));
			},
			
		}); 
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}
    return this;
}