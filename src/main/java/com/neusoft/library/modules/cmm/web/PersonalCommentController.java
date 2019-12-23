/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.cmm.web;

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
import com.neusoft.library.modules.cmm.entity.PersonalComment;
import com.neusoft.library.modules.cmm.service.PersonalCommentService;

/**
 * 我的评论Controller
 *  
 * @version 2019-04-18
 */
@Controller
@RequestMapping(value = "${adminPath}/cmm/personalComment")
public class PersonalCommentController extends BaseController {

	@Autowired
	private PersonalCommentService personalCommentService;
	
	@ModelAttribute
	public PersonalComment get(@RequestParam(required=false) String id) {
		PersonalComment entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = personalCommentService.get(id);
		}
		if (entity == null){
			entity = new PersonalComment();
		}
		return entity;
	}
	
	@RequiresPermissions("cmm:personalComment:view")
	@RequestMapping(value = {"list", ""})
	public String list(PersonalComment personalComment, HttpServletRequest request, 
			HttpServletResponse response, Model model) {
        String id = (String) request.getSession().getAttribute("backgroundId");
        personalComment.setCommentsId(id);
		Page<PersonalComment> page = personalCommentService.findPage(
				 new Page<PersonalComment>(request, response), personalComment); 
		model.addAttribute("page", page);
		return "modules/cmm/personalCommentList";
	}

	@RequiresPermissions("cmm:personalComment:view")
	@RequestMapping(value = "form")
	public String form(PersonalComment personalComment, Model model) {
		model.addAttribute("personalComment", personalComment);
		return "modules/cmm/personalCommentForm";
	}
	
	@RequiresPermissions("cmm:personalComment:edit")
	@RequestMapping(value = "delete")
	public String delete(PersonalComment personalComment, RedirectAttributes redirectAttributes) {
		personalCommentService.delete(personalComment);
		addMessage(redirectAttributes, "删除评论成功");
		return "redirect:"+Global.getAdminPath()+"/cmm/personalComment/?repage";
	}

}