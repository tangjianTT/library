/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.userlib.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.neusoft.library.modules.sys.entity.User;
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
import com.neusoft.library.modules.userlib.entity.SysUserLib;
import com.neusoft.library.modules.userlib.service.SysUserLibService;

/**
 * 图书借阅Controller
 * @author zl
 * @version 2020-01-02
 */
@Controller
@RequestMapping(value = "${adminPath}/userlib/sysUserLib")
public class SysUserLibController extends BaseController {

	@Autowired
	private SysUserLibService sysUserLibService;
	
	@ModelAttribute
	public SysUserLib get(@RequestParam(required=false) String id) {
		SysUserLib entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = sysUserLibService.get(id);
		}
		if (entity == null){
			entity = new SysUserLib();
		}
		return entity;
	}
	
	@RequiresPermissions("userlib:sysUserLib:view")
	@RequestMapping(value = {"list", ""})
	public String list(SysUserLib sysUserLib, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<SysUserLib> page = sysUserLibService.findPage(new Page<SysUserLib>(request, response), sysUserLib);
		model.addAttribute("page", page);
		return "modules/userlib/sysUserLibList";
	}

	@RequiresPermissions("userlib:sysUserLib:view")
	@RequestMapping(value = "form")
	public String form(SysUserLib sysUserLib, Model model) {
		model.addAttribute("sysUserLib", sysUserLib);
		return "modules/userlib/sysUserLibForm";
	}

	@RequiresPermissions("userlib:sysUserLib:edit")
	@RequestMapping(value = "save")
	public String save(SysUserLib sysUserLib, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, sysUserLib)){
			return form(sysUserLib, model);
		}
		sysUserLibService.save(sysUserLib);
		addMessage(redirectAttributes, "保存图书成功");
		return "redirect:"+Global.getAdminPath()+"/userlib/sysUserLib/?repage";
	}
	
	@RequiresPermissions("userlib:sysUserLib:edit")
	@RequestMapping(value = "delete")
	public String delete(SysUserLib sysUserLib, RedirectAttributes redirectAttributes) {
		sysUserLibService.delete(sysUserLib);
		addMessage(redirectAttributes, "删除图书成功");
		return "redirect:"+Global.getAdminPath()+"/userlib/sysUserLib/?repage";
	}
	@RequestMapping(value = "back")
	public  String back(SysUserLib sysUserLib, RedirectAttributes redirectAttributes) {
		final String id = sysUserLib.getId();
		final SysUserLib lib = sysUserLibService.get(id);
		if("1".equals(lib.getFlag())){
			addMessage(redirectAttributes, "该图书已归还");
			return "redirect:"+Global.getAdminPath()+"/userlib/sysUserLib/?repage";
		}
		lib.setFlag("1");
		sysUserLibService.back(lib);
		addMessage(redirectAttributes, "归还图书成功");
		return "redirect:"+Global.getAdminPath()+"/userlib/sysUserLib/?repage";
	}

	@RequestMapping(value = {"listPersonal", ""})
	public String listPersonal(SysUserLib sysUserLib, HttpServletRequest request, HttpServletResponse response, Model model) {
		String id = (String) request.getSession().getAttribute("backgroundId");
		final User user = new User();
		user.setId(id);
		sysUserLib.setUser(user);
		Page<SysUserLib> page = sysUserLibService.findPage(new Page<SysUserLib>(request, response), sysUserLib);
		model.addAttribute("page", page);
		return "modules/userlib/userLibList";
	}
}