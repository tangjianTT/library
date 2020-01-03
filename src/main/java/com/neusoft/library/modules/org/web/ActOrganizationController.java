
package com.neusoft.library.modules.org.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.alibaba.fastjson.JSONObject;
import com.neusoft.library.common.config.Global;
import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.web.BaseController;
import com.neusoft.library.common.utils.StringUtils;
import com.neusoft.library.modules.org.entity.ActOrganization;
import com.neusoft.library.modules.org.service.ActOrganizationService;

/**
 * 组织活动Controller
 *  
 * @version 2019-04-03
 */
@Controller
@RequestMapping(value = "${adminPath}/org/actOrganization")
public class ActOrganizationController extends BaseController {

	@Autowired
	private ActOrganizationService actOrganizationService;
	
	@ModelAttribute
	public ActOrganization get(@RequestParam(required=false) String id) {
		ActOrganization entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = actOrganizationService.get(id);
		}
		if (entity == null){
			entity = new ActOrganization();
		}
		return entity;
	}
	
	
	
	
	@RequiresPermissions("org:actOrganization:view")
	@RequestMapping(value = {"list", ""})
	public String list(ActOrganization actOrganization, HttpServletRequest request, 
			                HttpServletResponse response, Model model) {
		Page<ActOrganization> page = actOrganizationService.findPage(new Page<ActOrganization>(request, response), 
				           actOrganization); 
		model.addAttribute("page", page);
		return "modules/org/actOrganizationList";
	}

	@RequiresPermissions("org:actOrganization:view")
	@RequestMapping(value = "form")
	public String form(ActOrganization actOrganization, Model model) {
		model.addAttribute("actOrganization", actOrganization);
		return "modules/org/actOrganizationForm";
	}

	@RequiresPermissions("org:actOrganization:edit")
	@RequestMapping(value = "save")
	public String save(ActOrganization actOrganization, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, actOrganization)){
			return form(actOrganization, model);
		}
		actOrganizationService.save(actOrganization);
		addMessage(redirectAttributes, "保存活动成功");
		return "redirect:"+Global.getAdminPath()+"/org/actOrganization/?repage";
	}
	
	@RequiresPermissions("org:actOrganization:edit")
	@RequestMapping(value = "delete")
	public String delete(ActOrganization actOrganization, RedirectAttributes redirectAttributes) {
		actOrganizationService.delete(actOrganization);
		addMessage(redirectAttributes, "删除活动成功");
		return "redirect:"+Global.getAdminPath()+"/org/actOrganization/?repage";
	}

}