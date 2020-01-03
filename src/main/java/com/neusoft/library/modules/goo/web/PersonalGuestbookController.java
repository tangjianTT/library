
package com.neusoft.library.modules.goo.web;

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
import com.neusoft.library.modules.cms.entity.Guestbook;
import com.neusoft.library.modules.goo.entity.PersonalGuestbook;
import com.neusoft.library.modules.goo.service.PersonalGuestbookService;

/**
 * 我的留言Controller
 *  
 * @version 2019-04-18
 */
@Controller
@RequestMapping(value = "${adminPath}/goo/personalGuestbook")
public class PersonalGuestbookController extends BaseController {

	@Autowired
	private PersonalGuestbookService personalGuestbookService;
	
	@ModelAttribute
	public PersonalGuestbook get(@RequestParam(required=false) String id) {
		PersonalGuestbook entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = personalGuestbookService.get(id);
		}
		if (entity == null){
			entity = new PersonalGuestbook();
		}
		return entity;
	}
	
	@RequiresPermissions("goo:personalGuestbook:view")
	@RequestMapping(value = {"list", ""})
	public String list(PersonalGuestbook personalGuestbook, HttpServletRequest request, 
			   HttpServletResponse response, Model model) {
		String id = (String) request.getSession().getAttribute("backgroundId");
		personalGuestbook.setGuestbookId(id);
		Page<PersonalGuestbook> page = personalGuestbookService.findPage(
				new Page<PersonalGuestbook>(request, response), personalGuestbook); 
		model.addAttribute("page", page);
		return "modules/goo/personalGuestbookList";
	}

	@RequiresPermissions("goo:personalGuestbook:view")
	@RequestMapping(value = "form")
	public String form(PersonalGuestbook personalGuestbook, Model model) {
		model.addAttribute("personalGuestbook", personalGuestbook);
		return "modules/goo/personalGuestbookForm";
	}
	
	@RequiresPermissions("goo:personalGuestbook:edit")
	@RequestMapping(value = "delete")
	public String delete(PersonalGuestbook personalGuestbook, RedirectAttributes redirectAttributes) {
		personalGuestbookService.delete(personalGuestbook);
		addMessage(redirectAttributes, "删除留言成功");
		return "redirect:"+Global.getAdminPath()+"/goo/personalGuestbook/?repage";
	}

}