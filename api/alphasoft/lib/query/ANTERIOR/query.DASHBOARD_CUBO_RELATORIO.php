<?php

/**
 * Dashboard
 *
 * Documento Exclusivo AlphaSoft
 * @author Marcelo Santos
 *
 */

class QUERY_DASHBOARD_CUBO_RELATORIO
{


	
	/**
	 * Retorna o SQL da apresentação dos cubos por Usuário
	 */
	public function SHOW_CUBOS()
	{ 
		$sql	=	"select d.DATABASE_ID,c.CUBE_ID, c.CUBE_DESC,d.DATABASE_ORDER,d.DATABASE_SERVER,d.DATABASE_USER,d.DATABASE_PWD
						from att_wrs_cube c
						inner join rel_wrs_cube_user cu
						on c.CUBE_ID = cu.CUBE_ID
						inner join att_wrs_database d
						on c.DATABASE_ID = d.DATABASE_ID
						where cu.USER_ID=".WRS::USER_ID()."
						and d.DATABASE_LINK = ''
								and d.DATABASE_STATUS = 1
								and CUBE_STATUS = 1
								order by d.DATABASE_ORDER,c.CUBE_DESC";
		return $sql;
	}
		

	public function Get_SSAS_Cubes($server,$user,$pwd,$databse_id)
	{
		$sql	=	"EXEC Get_SSAS_Cubes '".$server."','".$user."','".$pwd."','".$databse_id."'";
		return $sql;
	}
	
	public function show_relatorio($cube_id)
	{
		$sql="select r.REPORT_ID, r.REPORT_DESC, r.REPORT_STATUS, r.CUBE_ID, c.CUBE_DESC, r.DATABASE_ID
			from att_wrs_report r
			inner join rel_wrs_report_layout rl
			on r.report_id = rl.report_id
			and layout_master = '1'
					inner join att_wrs_database d
					on r.database_id = d.database_id
					and d.database_status = 1
					inner join att_wrs_cube c
					on r.cube_id = c.cube_id
					and c.cube_status = 1
					where r.cube_id = '".$cube_id."'
							and (r.USER_ID = '".WRS::USER_ID()."' or (r.REPORT_SHARE = '1' and r.CUSTOMER_ID='".WRS::CUSTOMER_ID()."'))
							union
							select r.REPORT_ID, r.REPORT_DESC, r.REPORT_STATUS, r.CUBE_ID, c.CUBE_DESC, r.DATABASE_ID
							from att_wrs_report r
							inner join rel_wrs_dashboard_report rl
							on r.report_id = rl.report_id
							inner join att_wrs_database d
							on r.database_id = d.database_id
							and d.database_status = 1
							inner join att_wrs_cube c
							on r.cube_id = c.cube_id
							and c.cube_status = 1
							inner join att_wrs_dashboard ds
							on rl.dashboard_id = ds.dashboard_id
							where r.cube_id = '".$cube_id."'
									and (r.USER_ID = '".WRS::USER_ID()."' or (ds.DASHBOARD_SHARE = '1' and r.CUSTOMER_ID='".WRS::CUSTOMER_ID()."'))";

		return $sql;
		
		
	}
	
	
	
								
									
	
}