package com.neusoft.library.modules.sys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neusoft.library.modules.sys.service.AreaService;

@Controller
public class PartyMoneyController {
	
	@Autowired
	private AreaService areaService;
	
@RequestMapping("${adminPath}/sys/partyMoney/list")
	public ModelAndView list(String id){
	ModelAndView mdv=new ModelAndView();
	mdv.setViewName("modules/sys/partyMoneyList");
	mdv.addObject("id", id);
		System.out.println(id);
	return mdv;
}
	

}
