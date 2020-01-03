
package com.neusoft.library.modules.lib.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.neusoft.library.common.config.Global;
import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.web.BaseController;
import com.neusoft.library.common.utils.StringUtils;
import com.neusoft.library.modules.lib.entity.LibManage;
import com.neusoft.library.modules.lib.service.LibManageService;

/**
 * 馆内书建Controller
 * @author zl
 * @version 2020-01-02
 */
@Controller
@RequestMapping(value = "${adminPath}/lib/libManage")
public class LibManageController extends BaseController {

	@Autowired
	private LibManageService libManageService;
	
	@ModelAttribute
	public LibManage get(@RequestParam(required=false) String id) {
		LibManage entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = libManageService.get(id);
		}
		if (entity == null){
			entity = new LibManage();
		}
		return entity;
	}
	
	@RequiresPermissions("lib:libManage:view")
	@RequestMapping(value = {"list", ""})
	public String list(LibManage libManage, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<LibManage> page = libManageService.findPage(new Page<LibManage>(request, response), libManage); 
		model.addAttribute("page", page);
		return "modules/lib/libManageList";
	}

	@RequiresPermissions("lib:libManage:view")
	@RequestMapping(value = "form")
	public String form(LibManage libManage, Model model) {
		model.addAttribute("libManage", libManage);
		return "modules/lib/libManageForm";
	}

	@RequiresPermissions("lib:libManage:edit")
	@RequestMapping(value = "save")
	public String save(LibManage libManage, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, libManage)){
			return form(libManage, model);
		}
		libManageService.save(libManage);
		addMessage(redirectAttributes, "保存图书成功");
		return "redirect:"+Global.getAdminPath()+"/lib/libManage/?repage";
	}
	
	@RequiresPermissions("lib:libManage:edit")
	@RequestMapping(value = "delete")
	public String delete(LibManage libManage, RedirectAttributes redirectAttributes) {
		libManageService.delete(libManage);
		addMessage(redirectAttributes, "删除图书成功");
		return "redirect:"+Global.getAdminPath()+"/lib/libManage/?repage";
	}

}