document.getElementById("start_point").scrollIntoView();
const charts_div1 = document.getElementById("charts_div1");
const result_div1 = document.getElementById("result_div1");
const charts_div2 = document.getElementById("charts_div2");
const result_div2 = document.getElementById("result_div2");
const charts_div3 = document.getElementById("charts_div3");
const result_div3 = document.getElementById("result_div3");
const SecondTable = document.getElementById("second_tbl");
const collapsible = document.getElementsByClassName("collapsible");
const sectio3result = document.getElementsByClassName("sectio3result")[0];
const tableContainer = document.getElementsByClassName("tableContainer")[0];

for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "fit-content";
    }
  });
}

var sum = 0,
  Tc = 0,
  Ta = 0;

var lineChartLable = "";
var yLineChartValuesC = [];
var yLineChartValuesA = [];
var xLineChartValues = ["ω", "ω", "OPA w"];
var xLineChartValuesC = [];
var xLineChartValuesA = [];
var lineChartColors = [];
var lineChartDatasetA = [];
var lineChartDatasetC = [];

var global_cl = 0;
var counter_2 = 0;
var ind_min_rank_C = -1;
var ind_k_pre_last_joft_for_halate_1 = -1;
var ind_k_pre_last_joft_for_halate_2 = -1;
var ind_D = -1;
var ind_k_pre_last_joft_for_halate_3 = -1;
var ind_k_pre_last_joft_for_halate_4 = -1;
var can_scroll_down = false;
var _number_of_experts = 1;
var _number_of_criterias = 1;
var _number_of_alternatives = 2;

var experts = []; //1d
var criterias_name = []; //1d
var alternatives_name = []; //1d
var expert_criteria_rank = []; //2d
var criterias_Ww = []; //1d
var expert_criteria_alternatives_rank = []; //3d
var solution;
var z_val;

var v1;
var v1_koli;
var v2;
var criterias_x = [];
var criterias_local_cl = [];
var Criteria_Local_Cl;

var next_ind_experts_i = 0; //1d
var next_ind_criterias_name_i = 0; //1d
var next_ind_alternatives_name_i = 0; //1d
var next_ind_criterias_Ww = 0; //1d
var next_ind_expert_criteria_rank_i = 0; //2d
var next_ind_expert_criteria_rank_j = 0; //2d
var next_ind_expert_criteria_alternatives_rank = 0; //3d
var next_ind_expert_criteria_alternatives_rank_i = 0; //3d
var next_ind_expert_criteria_alternatives_rank_j = 0; //3d
var next_ind_expert_criteria_alternatives_rank_k = 0; //3d

var can_calc = false;
var str = "";
var inf = 999999999999999;
var arr_mahdodiyatha_A = []; //2d
var arr_mahdodiyatha_A_all = []; //3d
var num_namoadelat = 0;

var Wijk_ha = []; //3d
var Ww__rank_for_EC;

var wazn_criteria = [],
  wazn_alternatives = [];
const email = document.getElementById("email_address");
const emailError = document.getElementById("email-error");

function emailFocused() {
  emailError.innerText = "";
}

emailError.onanimationend = () => {
  emailError.classList.remove("flicker");
};

function func_save_inputs() {
  //My Script Start
  const tbl_experts = document.getElementById("number_of_experts");
  const tbl_criteria = document.getElementById("number_of_criterias");
  const tbl_alternatives = document.getElementById("number_of_alternatives");
  const answer = document.getElementById("spreadsheet");
  answer.innerHTML = "";

  const Expert = +tbl_experts.value;
  const Criteria = +tbl_criteria.value;
  const Alternatives = +tbl_alternatives.value;

  const columns = [
    { title: "Expert" },
    { title: "Rank" },
    { title: "Criteria", width: 165 },
    { title: "Rank" },
    { title: "" },
  ];

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.value.match(validRegex)) {
    emailError.innerText = "The email address is invalid";
    emailError.classList.add("flicker");
    return;
  }

  for (i = 1; i <= Expert; i++) {
    columns.push({ title: "E" + i, colspan: Criteria });
  }
  var num = 1;
  const nestedHeaders = [];
  const part1 = [];
  const part2 = [];
  const part3 = [];
  const data = [];
  for (i = 1; i <= Expert; i++) {
    part1.push(["E" + i, ""]);
  }
  for (i = 1; i <= Expert; i++) {
    for (j = 1; j <= Criteria; j++) {
      part2.push(["E" + i + "C" + j, ""]);
    }
  }
  for (i = 1; i <= Alternatives; i++) {
    part3.push(["A" + i, ...Array(Expert * Criteria).fill("")]);
  }
  for (i = 0; i < Math.max(part2.length, part3.length); i++) {
    var p1 = [];
    if (part1[i]) {
      p1.push(...part1[i]);
    } else {
      p1.push(...["", ""]);
    }
    if (part2[i]) {
      p1.push(...part2[i]);
    } else {
      p1.push(...["", ""]);
    }
    if (part3[i]) {
      p1.push(...part3[i]);
    } else {
      p1.push(...[""]);
    }
    data.push(p1);
  }
  // console.log(data)
  for (i = 1; i <= 5; i++) {
    if (i == 3) {
      nestedHeaders.push({
        title: " ",
        width: 100,
      });
      continue;
    }
    nestedHeaders.push({
      title: " ",
    });
  }
  for (i = 1; i <= Expert; i++) {
    for (j = 1; j <= Criteria; j++) {
      nestedHeaders.push({
        title: "C" + j,
      });
    }
  }
  // console.log(nestedHeaders)

  table = jspreadsheet(document.getElementById("spreadsheet"), {
    data: data,
    columns: nestedHeaders,
    nestedHeaders: columns,
  });
  document.getElementById("spreadsheet").scrollIntoView();
  // My Script End

  arr_mahdodiyatha_A = [];
  experts = [];
  experts_value = [];
  expert_criteria_rank = [];
  expert_criteria_rank_value = [];
  expert_criteria_alternatives_rank = [];
  expert_criteria_alternatives_rank_value = [];

  //set number_of ...
  _number_of_experts = +document.getElementById("number_of_experts").value;
  _number_of_criterias = +document.getElementById("number_of_criterias").value;
  _number_of_alternatives = +document.getElementById("number_of_alternatives")
    .value;
}

function select_min_rank_experts() {
  let min_rank = inf;
  let ind_min_rank = -1;
  for (let i = 0; i < _number_of_experts; i++) {
    if (experts[i].selected == 0 && experts[i].rank < min_rank) {
      min_rank = experts[i].rank;
      ind_min_rank = i;
    }
  }
  if (ind_min_rank != -1) {
    experts[ind_min_rank].selected = 1;

    experts[ind_min_rank].new_index_i = next_ind_experts_i;
    next_ind_experts_i++;
  }

  return ind_min_rank;
}

function select_min_rank_criteria(i) {
  let min_rank = inf;
  let ind_min_rank = -1;
  for (let j = 0; j < _number_of_criterias; j++) {
    if (
      expert_criteria_rank[i][j].selected == 0 &&
      expert_criteria_rank[i][j].rank < min_rank
    ) {
      min_rank = expert_criteria_rank[i][j].rank;
      ind_min_rank = j;
    }
  }
  if (ind_min_rank != -1) {
    expert_criteria_rank[i][ind_min_rank].selected = 1;

    expert_criteria_rank[i][ind_min_rank].new_index_i = i;

    expert_criteria_rank[i][ind_min_rank].new_index_j =
      next_ind_expert_criteria_rank_j;
    next_ind_expert_criteria_rank_j++;

    criterias_name[ind_min_rank].new_index_i = next_ind_criterias_name_i;
    next_ind_criterias_name_i++;
  }

  return ind_min_rank;
}

function select_min_rank_alt_new(i, j, k_old) {
  let min_rank = inf;
  let ind_min_rank = -1;
  for (let k = 0; k < _number_of_alternatives; k++) {
    if (
      expert_criteria_alternatives_rank[i][j][k].rank < min_rank &&
      expert_criteria_alternatives_rank[i][j][k].selected == 0
    ) {
      min_rank = expert_criteria_alternatives_rank[i][j][k].rank;
      ind_min_rank = k;
    }
  }

  if (ind_min_rank != -1) {
    expert_criteria_alternatives_rank[i][j][ind_min_rank].selected = 1;

    for (let k = 0; k < _number_of_alternatives; k++)
      expert_criteria_alternatives_rank[i][j][k].joft = 0;
  }

  return ind_min_rank;
}

function calc_k_prime(i, j, k, old_k_prime) {
  //alert("k: "+k.toString());

  ind_k_pre_last_joft_for_halate_1 = -1;
  ind_k_pre_last_joft_for_halate_2 = -1;

  ind_k_pre_last_joft_for_halate_3 = -1;
  ind_k_pre_last_joft_for_halate_4 = -1;

  let min_rank = inf;
  let ind_min_rank = -1;
  let last_k = -1;
  let last_min_rank_joft = -1;

  ///find the best joft x for k
  /*
       for (let x = 0; x < _number_of_alternatives; x++)
       {
           if( expert_criteria_alternatives_rank[i][j][x].rank  < min_rank  //  && expert_criteria_alternatives_rank[i][j][x].selected == 0
          &&  x != ind_D  && ind_D > -1 
           && expert_criteria_alternatives_rank[i][j][k].min_rank_joft ==   expert_criteria_alternatives_rank[i][j][x].rank
           
       
        	
           )
        	
          {
           
      
      
            
           
                  min_rank = expert_criteria_alternatives_rank[i][j][x].rank   ;
              ind_min_rank = x ;
              last_min_rank_joft = expert_criteria_alternatives_rank[i][j][k].min_rank_joft ;
              expert_criteria_alternatives_rank[i][j][k].min_rank_joft = expert_criteria_alternatives_rank[i][j][ind_min_rank].rank ;
              last_k = k ;
                
                
               if(expert_criteria_alternatives_rank[i][j][k].min_rank_joft ==   expert_criteria_alternatives_rank[i][j][x].rank )
               ind_D = ind_min_rank ;
                
           
      
            
          }
        	
      	
        	
      
        	
      
        	
      
       
       }*/

  for (let x = 0; x < _number_of_alternatives; x++) {
    if (
      expert_criteria_alternatives_rank[i][j][x].rank < min_rank &&
      expert_criteria_alternatives_rank[i][j][x].selected == 0 &&
      expert_criteria_alternatives_rank[i][j][x].joft == 0
    ) {
      if (
        // expert_criteria_alternatives_rank[i][j][k].min_rank_joft <=   expert_criteria_alternatives_rank[i][j][x].rank &&
        expert_criteria_alternatives_rank[i][j][k].rank <
        expert_criteria_alternatives_rank[i][j][x].rank
      ) {
        min_rank = expert_criteria_alternatives_rank[i][j][x].rank;
        ind_min_rank = x;
        last_min_rank_joft =
          expert_criteria_alternatives_rank[i][j][k].min_rank_joft;
        expert_criteria_alternatives_rank[i][j][k].min_rank_joft =
          expert_criteria_alternatives_rank[i][j][ind_min_rank].rank;
        last_k = k;
      }
    }
  }

  //alert(ind_min_rank);

  //  normal :  (A > B                > C)
  if (
    ind_min_rank >= 0 &&
    expert_criteria_alternatives_rank[i][j][ind_min_rank].rank >
    expert_criteria_alternatives_rank[i][j][k].rank
  ) {
    ind_k_pre_last_joft_for_halate_4 = 1;
    //alert(expert_criteria_alternatives_rank[i][j][ind_min_rank].rank);
    expert_criteria_alternatives_rank[i][j][ind_min_rank].joft = 1;
    expert_criteria_alternatives_rank[i][j][k].rank_last_joft =
      expert_criteria_alternatives_rank[i][j][ind_min_rank].rank;
    expert_criteria_alternatives_rank[i][j][k].ind_k_last_joft = ind_min_rank;

    return ind_min_rank;
  }

  return -1;
}

function DC_badtarin_rank_ra_darand(ind__C) {
  let max_rank = -1;
  let ind_max_rank = -1;

  //find bad

  for (let i = 0; i < _number_of_experts; i++)
    for (let j = 0; j < _number_of_criterias; j++)
      for (
        let x = 0;
        x < _number_of_alternatives;
        x++ //
      ) {
        if (expert_criteria_alternatives_rank[i][j][x].rank > max_rank) {
          max_rank = expert_criteria_alternatives_rank[i][j][x].rank;
          ind_max_rank = x;

          if (
            expert_criteria_alternatives_rank[i][j][ind__C].rank <
            expert_criteria_alternatives_rank[i][j][ind_max_rank].rank
          )
            return true;
        }
      }

  // if(expert_criteria_alternatives_rank[i][j][ind_max_rank].rank  < expert_criteria_alternatives_rank[i][j][ind__C].rank )return true ;

  return false;
}

function push_mahdoodiyat(
  i_zaribdar,
  j_zaribdar,
  k_zaribdar,
  k_prime,
  zarib,
  add_zaribe_k_prime,
  add_zaribe_k
) {
  var arr_temp = [];

  let sub_str = "1";
  arr_temp.push(1);
  //str = str +"  ,  " + (zarib).toString() ;

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        if (
          add_zaribe_k &&
          i == i_zaribdar &&
          j == j_zaribdar &&
          k == k_zaribdar
        ) {
          sub_str = sub_str + " ," + (-1 * zarib).toString();
          arr_temp.push(-1 * zarib);
          arr_mahdodiyatha_A_all[i][j][k].zarib = -1 * zarib;
        }
        // else
        //{
        if (
          add_zaribe_k_prime &&
          i == i_zaribdar &&
          j == j_zaribdar &&
          k == k_prime
        ) {
          sub_str = sub_str + " ," + zarib.toString();
          arr_temp.push(zarib);
          arr_mahdodiyatha_A_all[i][j][k].zarib = zarib;
        }


        if (
          !(
            add_zaribe_k &&
            i == i_zaribdar &&
            j == j_zaribdar &&
            k == k_zaribdar
          ) &&
          !(
            add_zaribe_k_prime &&
            i == i_zaribdar &&
            j == j_zaribdar &&
            k == k_prime
          )
        ) {
          sub_str = sub_str + " ,0";
          arr_temp.push(0);
        }
        //}
      }
    }
  }
  str = str + "\n" + sub_str;
  arr_mahdodiyatha_A.push(arr_temp);
  num_namoadelat++;
}

function creat_Wijk_ha_from_solution() {
  //Wijk_ha 3d

  for (let e = 0; e < _number_of_experts; e++) Wijk_ha[e] = [];

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      Wijk_ha[i][j] = [];
    }
  }

  let next_ind_solution = 1; //0 is z

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        Wijk_ha[i][j][k] = solution[next_ind_solution];
        arr_mahdodiyatha_A_all[i][j][k].w = solution[next_ind_solution];
        next_ind_solution++;
      }
    }
  }
}

function calc_W_ha() {
  for (let i = 0; i < _number_of_experts; i++) experts[i].w = 0;

  for (let j = 0; j < _number_of_criterias; j++) criterias_name[j].w = 0;

  for (let k = 0; k < _number_of_alternatives; k++) alternatives_name[k].w = 0;

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        experts[i].w = experts[i].w + arr_mahdodiyatha_A_all[i][j][k].w;

        criterias_name[j].w =
          criterias_name[j].w + arr_mahdodiyatha_A_all[i][j][k].w;

        alternatives_name[k].w =
          alternatives_name[k].w + arr_mahdodiyatha_A_all[i][j][k].w;
      }
    }
  }
}

function calc_wij_wik_ha() {
  // New Calculations, Wij
  var criterias_name_new = []; //2d
  var alternatives_name_new = []; //2d
  var result_tbl = []; //2d
  var result_tbl_rows = _number_of_criterias + _number_of_alternatives + 1;

  // Clear Table For New Drawing

  // Initialize result_tbl
  for (let i = 0; i <= result_tbl_rows; i++) {
    result_tbl[i] = [];
  }

  for (let i = 0; i <= result_tbl_rows; i++) {
    for (let j = 0; j <= _number_of_experts + 3; j++) {
      result_tbl[i].push("");
    }
  }
  result_tbl[0] = [""];
  for (let i = 0; i < _number_of_experts; i++) {
    result_tbl[0].push("E" + (i + 1));
  }
  result_tbl[0].push(...["ω", "ω", "Length"]);

  // Initialize criterias_name_new
  for (let i = 0; i < _number_of_criterias; i++) {
    for (let j = 0; j < _number_of_experts; j++) {
      criterias_name_new[i] = [];
    }
  }

  for (let i = 0; i < _number_of_criterias; i++) {
    for (let j = 0; j < _number_of_experts; j++) {
      criterias_name_new[i].push({ w: 0 });
    }
  }

  // Initialize alternatives_name_new
  for (let i = 0; i < _number_of_alternatives; i++) {
    for (let k = 0; k < _number_of_experts; k++) {
      alternatives_name_new[i] = [];
    }
  }

  for (let i = 0; i < _number_of_alternatives; i++) {
    for (let k = 0; k < _number_of_experts; k++) {
      alternatives_name_new[i].push({ w: 0 });
    }
  }

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        criterias_name_new[j][i].w =
          criterias_name_new[j][i].w + arr_mahdodiyatha_A_all[i][j][k].w;
      }
    }
  }

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        alternatives_name_new[k][i].w =
          alternatives_name_new[k][i].w + arr_mahdodiyatha_A_all[i][j][k].w;
      }
    }
  }

  sum = 0;
  for (let i = 1; i <= _number_of_criterias; i++) {
    sum = sum + 1 / i;
  }

  Ta = 0;
  Tc = 0;

  Tc = 1 / (2 * sum);
  Ta = 1 / _number_of_alternatives;

  for (let i = 1; i <= _number_of_criterias; i++) {
    result_tbl[i][0] = "C" + i;
    for (let j = 1; j <= _number_of_experts; j++) {
      result_tbl[i][j] = criterias_name_new[i - 1][j - 1].w;
    }
  }

  for (let i = _number_of_criterias + 2; i <= result_tbl_rows; i++) {
    result_tbl[i][0] = "A" + (i - (_number_of_criterias + 1));
    for (let j = 1; j <= _number_of_experts; j++) {
      result_tbl[i][j] =
        alternatives_name_new[i - (_number_of_criterias + 2)][j - 1].w;
    }
  }

  for (let i = 1; i <= _number_of_criterias; i++) {
    let max = criterias_name_new[i - 1].reduce((prev, curr) =>
      prev.w > curr.w ? prev : curr
    );
    let min = criterias_name_new[i - 1].reduce((prev, curr) =>
      prev.w < curr.w ? prev : curr
    );
    let length = max.w - min.w;
    result_tbl[i][_number_of_experts + 1] = min.w;
    result_tbl[i][_number_of_experts + 2] = max.w;
    result_tbl[i][_number_of_experts + 3] = length;
  }

  let startnumber = _number_of_criterias + 2;
  for (let i = startnumber; i <= result_tbl_rows; i++) {
    let max = alternatives_name_new[i - startnumber].reduce((prev, curr) =>
      prev.w > curr.w ? prev : curr
    );
    let min = alternatives_name_new[i - startnumber].reduce((prev, curr) =>
      prev.w < curr.w ? prev : curr
    );

    let length = max.w - min.w;
    result_tbl[i][_number_of_experts + 1] = min.w;
    result_tbl[i][_number_of_experts + 2] = max.w;
    result_tbl[i][_number_of_experts + 3] = length;
  }

  // Initialize second_tbl
  var second_tbl = [];
  for (let i = 0; i <= result_tbl_rows; i++) {
    second_tbl[i] = [];
  }

  for (let i = 0; i <= result_tbl_rows; i++) {
    for (let j = 0; j <= _number_of_experts + 5; j++) {
      second_tbl[i][j] = result_tbl[i][j];
    }
  }

  var tr_ha = "";
  result_tbl.map((item, index) => {
    if (index == 0) {
      // Diffrent Array Map For Header Of Table
      tr_ha = tr_ha + "<tr>";
      item.map((i, j) => {
        if (j > 0 && j <= _number_of_experts) {
          return;
        }
        // Difrrent Style For Min Column
        if (j == _number_of_experts + 1) {
          tr_ha = tr_ha + "<th class='min_th'>" + i + "</th>";
          return;
        }

        // Difrrent Style For Max Column
        if (j == _number_of_experts + 2) {
          tr_ha = tr_ha + "<th class='max_th'>" + i + "</th>";
          return;
        }

        tr_ha = tr_ha + "<th>" + i + "</th>";
      });

      tr_ha = tr_ha + "</tr>";
    } else {
      tr_ha = tr_ha + "<tr>";
      item.map((i, j) => {
        if (j > 0 && j <= _number_of_experts) {
          return;
        }
        tr_ha = tr_ha + "<td>" + i + "</td>";
      });
      tr_ha = tr_ha + "</tr>";
    }
  });

  // Table.innerHTML = tr_ha;

  console.log("Wij= ", criterias_name_new);
  console.log("Wik= ", alternatives_name_new);
  var tem_tbl_data = 0;
  for (let i = 1; i <= _number_of_experts; i++) {
    tem_tbl_data = 0;

    for (let j = 1; j <= _number_of_criterias; j++) {
      tem_tbl_data = +(+second_tbl[j][i] + tem_tbl_data);
    }

    for (let j = 1; j <= _number_of_criterias; j++) {
      second_tbl[j][i] = +(+second_tbl[j][i] / tem_tbl_data);
    }

    tem_tbl_data = 0;

    for (let j = _number_of_criterias + 2; j <= result_tbl_rows; j++) {
      tem_tbl_data = +(+second_tbl[j][i] + tem_tbl_data);
    }

    for (let j = _number_of_criterias + 2; j <= result_tbl_rows; j++) {
      second_tbl[j][i] = +(+second_tbl[j][i] / tem_tbl_data);
    }
  }

  // add wazn_criteria & wazn_alternatives to second_tbl
  const new_second_tbl = (second_tbl, wazn_criteria, wazn_alternatives) => {
    return second_tbl.map((item, index) => {
      index == 0 && item.splice(_number_of_experts + 3, 0, "OPA ω");
      index > 0 &&
        index <= _number_of_criterias &&
        item.splice(_number_of_experts + 3, 0, wazn_criteria[index - 1]);
      index == _number_of_criterias + 1 &&
        item.splice(_number_of_experts + 3, 0, "");
      index > _number_of_criterias + 1 &&
        item.splice(
          _number_of_experts + 3,
          0,
          wazn_alternatives[index - _number_of_criterias - 2]
        );
      item.splice(_number_of_experts + 5, 2);
      return item;
    });
  };
  let second_tbl_jadid = new_second_tbl(
    second_tbl,
    wazn_criteria,
    wazn_alternatives
  );

  // Calculate Wmin & Wmax & Length & Landa & Landa%
  second_tbl_jadid[0][_number_of_experts + 5] = "σ";
  second_tbl_jadid[0][_number_of_experts + 6] = "σ%";
  second_tbl_jadid[0].push(...["Threshold", "H1:∆>T"]);

  for (let i = 1; i < second_tbl_jadid.length; i++) {
    for (let j = 1; j < _number_of_experts + 5; j++) {
      second_tbl_jadid[i][j] != "" &&
        (second_tbl_jadid[i][j] = +second_tbl_jadid[i][j]);
    }
  }

  for (let i = 1; i <= result_tbl_rows; i++) {
    let max_temp = second_tbl_jadid[i][1];
    let min_temp = second_tbl_jadid[i][1];
    let landa = 0;
    for (let j = 1; j <= _number_of_experts; j++) {
      max_temp <= second_tbl_jadid[i][j]
        ? (max_temp = second_tbl_jadid[i][j])
        : "";
      min_temp >= second_tbl_jadid[i][j]
        ? (min_temp = second_tbl_jadid[i][j])
        : "";
      landa =
        landa +
        Math.pow(
          +second_tbl_jadid[i][_number_of_experts + 3] - second_tbl_jadid[i][j],
          2
        );
      // landa = +(landa.toFixed(4))
    }

    second_tbl_jadid[i][_number_of_experts + 1] = min_temp;
    second_tbl_jadid[i][_number_of_experts + 2] = max_temp;

    let length = max_temp - min_temp;
    Ta = 0;
    Tc = 0;
    Tc = 1 / (2 * sum);
    Ta = 1 / _number_of_alternatives;

    if (max_temp) {
      second_tbl_jadid[i][_number_of_experts + 4] = +(max_temp - min_temp);

      second_tbl_jadid[i][_number_of_experts + 5] = +Math.sqrt(
        landa / (_number_of_experts - 1)
      );

      second_tbl_jadid[i][_number_of_experts + 6] = +(
        (second_tbl_jadid[i][_number_of_experts + 5] /
          second_tbl_jadid[i][_number_of_experts + 3]) *
        100
      );

      if (i <= _number_of_criterias) {
        second_tbl_jadid[i][_number_of_experts + 7] = Tc;
        second_tbl_jadid[i][_number_of_experts + 8] =
          length.toFixed(6) > Tc.toFixed(6) ? "Reject" : "Accept";
      } else {
        second_tbl_jadid[i][_number_of_experts + 7] = Ta;
        second_tbl_jadid[i][_number_of_experts + 8] =
          length.toFixed(6) > Ta.toFixed(6) ? "Reject" : "Accept";
      }
    }
  }

  // Generate Random Colors
  lineChartColors = [];

  for (let i = 1; i <= result_tbl_rows; i++) {
    lineChartColors.push(
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
  }
  var tempValueC = [],
    tempValueA = [];
  for (let j = _number_of_experts + 1; j <= _number_of_experts + 3; j++) {
    for (let i = 1; i <= result_tbl_rows; i++) {
      i <= _number_of_criterias && tempValueC.push(second_tbl_jadid[i][j]);
      i > _number_of_criterias + 1 && tempValueA.push(second_tbl_jadid[i][j]);
    }
    yLineChartValuesC.push(tempValueC);
    yLineChartValuesA.push(tempValueA);
    tempValueC = [];
    tempValueA = [];
  }

  var second_tr_ha = "";
  second_tbl_jadid.map((item, index) => {
    if (index == 0) {
      second_tr_ha = second_tr_ha + "<thead class='thead'><tr>";
      item.map((i, j) => {
        if (j > 0 && j <= _number_of_experts) {
          return;
        }
        // Difrrent Style For Min Column
        if (j == _number_of_experts + 1) {
          second_tr_ha = second_tr_ha + "<th class='min_th'>" + i + "</th>";
          return;
        }

        // Difrrent Style For Max Column
        if (j == _number_of_experts + 2) {
          second_tr_ha = second_tr_ha + "<th class='max_th'>" + i + "</th>";
          return;
        }
        second_tr_ha = second_tr_ha + "<th>" + i + "</th>";
      });
      second_tr_ha = second_tr_ha + "</tr></thead><tbody>";
    } else if (index == _number_of_criterias + 1) {
      second_tr_ha = second_tr_ha + "<tr></tr>";
    } else {
      // Create Line Lables

      if (index <= _number_of_criterias) {
        xLineChartValuesC.push("C" + index);
      } else {
        xLineChartValuesA.push("A" + (index - _number_of_criterias - 1));
      }

      second_tr_ha = second_tr_ha + "<tr>";
      item.map((i, j) => {
        // Skip Experts Value
        if (j > 0 && j <= _number_of_experts) {
          return;
        }
        // Values
        if (j > 0 && j < _number_of_experts + 8) {
          second_tr_ha =
            second_tr_ha + "<td>" + parseFloat(i.toFixed(4)) + "</td>";
          return;
        }
        // Accept or Reject
        second_tr_ha = second_tr_ha + "<td>" + i + "</td>";
      });
      second_tr_ha = second_tr_ha + "</tr>";
    }
    // Create Dataset For Criterias
    if (
      index > 0 &&
      index <= _number_of_criterias &&
      xLineChartValues[index - 1]
    ) {
      lineChartDatasetC.push({
        maxBarThickness: 8,
        label: xLineChartValues[index - 1],
        data: yLineChartValuesC[index - 1],
        borderColor: lineChartColors[index],
      });
      lineChartDatasetA.push({
        maxBarThickness: 8,
        label: xLineChartValues[index - 1],
        data: yLineChartValuesA[index - 1],
        borderColor: lineChartColors[index],
      });
    }
    // Create Dataset For Alternatives
    // if (index > _number_of_criterias + 1) {
    //   lineChartDatasetA.push({
    //     label: xLineChartValues,
    //     data: yLineChartValuesA,
    //     borderColor: lineChartColors[index],
    //   });
    // }
    // xLineChartValuesC = [];
    // xLineChartValuesA = [];
    // yLineChartValues = [];
  });
  second_tr_ha = second_tr_ha + "</tbody>";
  SecondTable.innerHTML = second_tr_ha;

  console.log("second_tbl", second_tbl);

  var sectio3resultStyle = window.getComputedStyle(SecondTable);
  sectio3result.style.height = sectio3resultStyle.getPropertyValue("height");
  console.log("SecondTable.style.height", sectio3result.style.height);
  // Table Charts

  draw_line_chart(
    "sectio3chart_c",
    "sectio3download_chart_c",
    xLineChartValuesC,
    "Criteria",
    lineChartDatasetC
  );
  draw_line_chart(
    "sectio3chart_a",
    "sectio3download_chart_a",
    xLineChartValuesA,
    "Alternatives",
    lineChartDatasetA
  );

  lineChartDatasetC = [];
  lineChartDatasetA = [];
  xLineChartValues = ["ω", "ω", "OPA w"];
  yLineChartValuesA = [];
  yLineChartValuesC = [];
  xLineChartValuesC = [];
  xLineChartValuesA = [];
}

function calc_etebar() {
  //////////////////////////////////

  v1 = _number_of_alternatives - 1 - 2.0 / _number_of_experts;
  v2 = (_number_of_experts - 1) * v1;

  //v1 = _number_of_criterias -1 - ( 2.0 /_number_of_experts ) ;
  // v2 = (_number_of_experts -1 )*v1 ;

  //
  for (let c = 0; c < _number_of_criterias; c++) {
    var __rank_for_current_c = [];
    for (let a = 0; a < _number_of_alternatives; a++) {
      var E_a_i = [];
      for (let e = 0; e < _number_of_experts; e++) {
        E_a_i.push(expert_criteria_alternatives_rank[e][c][a].rank);
      }
      __rank_for_current_c.push(E_a_i);
    }

    criterias_Ww[c] = calc_Ww(__rank_for_current_c); // mxRank_i for each c_i

    criterias_x[c] =
      (criterias_Ww[c] * (_number_of_experts - 1)) / (1 - criterias_Ww[c]);

    criterias_local_cl[c] = window.Obj.get_cdf(criterias_x[c], v1, v2);

    if (isNaN(criterias_local_cl[c])) {
      if (criterias_Ww[c] == 0) {
        criterias_local_cl[c] = 0;
      } else {
        criterias_local_cl[c] = 1;
      }
    }

    global_cl = global_cl + criterias_local_cl[c] * criterias_name[c].w;
  }
  //

  //expert_criteria_rank
  var __rank_for_EC = [];

  for (let c = 0; c < _number_of_criterias; c++) {
    var arr_ = [];
    for (let e = 0; e < _number_of_experts; e++) {
      arr_.push(expert_criteria_rank[e][c].rank);
    }
    __rank_for_EC.push(arr_);
  }

  v1 = _number_of_criterias - 1 - 2.0 / _number_of_experts;
  v2 = (_number_of_experts - 1) * v1;

  Ww__rank_for_EC = calc_Ww(__rank_for_EC);
  //
  Criteria_Local_Cl = window.Obj.get_cdf(
    (Ww__rank_for_EC * (_number_of_experts - 1)) / (1 - Ww__rank_for_EC),
    v1,
    v2
  );

  if (isNaN(Criteria_Local_Cl)) {
    if (Ww__rank_for_EC == 0) {
      Criteria_Local_Cl = 0;
    } else {
      Criteria_Local_Cl = 1;
    }
  }

  global_cl = Criteria_Local_Cl * global_cl;
  // alert(Ww__rank_for_EC);

  //alert("Global cl  = " + global_cl.toString());

  //////////////////
}

function show_result() {
  let _val1;
  var xValues = [];
  var yValues = [];
  var barColors = [];

  for (let k = 0; k < _number_of_experts; k++) {
    _val1 = experts[k].w;
    if (isNaN(_val1)) _val1 = 1;
    var new_input = document.createElement("P");
    new_input.innerHTML = "W ( " + experts[k].name + " ) : " + _val1.toFixed(6);
    result_div1.appendChild(new_input);

    xValues.push(experts[k].name);
    yValues.push(experts[k].w.toFixed(6));
    barColors.push("DodgerBlue");
  }
  new_input = document.createElement("BR");
  result_div1.appendChild(new_input);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  draw_chart(
    "sectio1chart_e",
    "sectio1download_chart_e",
    xValues,
    yValues,
    barColors,
    "Experts:",
    "Weight"
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var xValues = [];
  var yValues = [];
  var barColors = [];

  for (let k = 0; k < _number_of_criterias; k++) {
    _val1 = criterias_name[k].w;
    wazn_criteria.push(_val1.toFixed(4));
    if (isNaN(_val1)) _val1 = 1;
    var new_input = document.createElement("P");
    new_input.innerHTML =
      "W ( " + criterias_name[k].name + " ) : " + _val1.toFixed(6);
    result_div1.appendChild(new_input);

    xValues.push(criterias_name[k].name);
    yValues.push(criterias_name[k].w.toFixed(6));
    barColors.push("red");
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  draw_chart(
    "sectio1chart_c",
    "sectio1download_chart_c",
    xValues,
    yValues,
    barColors,
    "Criteria:",
    "Weight"
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var xValues = [];
  var yValues = [];
  var barColors = [];

  new_input = document.createElement("BR");
  result_div1.appendChild(new_input);

  for (let k = 0; k < _number_of_alternatives; k++) {
    _val1 = alternatives_name[k].w;
    wazn_alternatives.push(_val1.toFixed(4));

    if (isNaN(_val1)) _val1 = 1;

    var new_input = document.createElement("P");
    new_input.innerHTML =
      "W (" + alternatives_name[k].name + ") :" + _val1.toFixed(6);
    result_div1.appendChild(new_input);

    xValues.push(alternatives_name[k].name);
    yValues.push(alternatives_name[k].w.toFixed(6));
    barColors.push("green");
  }
  new_input = document.createElement("BR");
  result_div1.appendChild(new_input);

  ////////////////////////

  // Section2 ---------------------------
  var section2xValues1 = [];
  var section2yValues1 = [];
  var section2xValues2 = [];
  var section2yValues2 = [];
  var section2barColors1 = [];
  var section2barColors2 = [];

  var section2kendallxValues = [];
  var section2kendallyValues = [];
  var section2localxValues = [];
  var section2localyValues = [];

  section2barColors1.push("green");
  section2barColors2.push("blue");

  result_div2.innerHTML = "";

  for (let c = 0; c < _number_of_criterias; c++) {
    //criterias_Ww[c]
    //criterias_local_cl[c]

    var new_input = document.createElement("P");
    _val1 = criterias_Ww[c];
    if (isNaN(_val1)) _val1 = 1;
    new_input.innerHTML =
      "Kendall’s W ( " + criterias_name[c].name + " ) :" + _val1.toFixed(6);

    section2xValues1.push(criterias_name[c].name);
    section2yValues1.push(_val1.toFixed(6));

    result_div2.appendChild(new_input);

  }
  new_input = document.createElement("BR");
  result_div2.appendChild(new_input);
  for (let c = 0; c < _number_of_criterias; c++) {
    //criterias_Ww[c]
    //criterias_local_cl[c]

    var new_input = document.createElement("P");
    _val1 = criterias_local_cl[c];
    if (isNaN(_val1)) _val1 = 1;
    new_input.innerHTML =
      "Local confidence level of alternatives ( " +
      criterias_name[c].name +
      " ) :" +
      _val1.toFixed(6);

    section2xValues2.push(criterias_name[c].name);
    section2yValues2.push(_val1.toFixed(6));

    result_div2.appendChild(new_input);
  }
  new_input = document.createElement("BR");
  result_div2.appendChild(new_input);

  //Ww__rank_for_EC
  var new_input = document.createElement("P");

  _val1 = Ww__rank_for_EC;
  if (isNaN(_val1)) _val1 = 1;

  new_input.innerHTML = "Kendall’s W among criteria:" + _val1.toFixed(6);

  section2kendallxValues.push("Kendall’s W among criteria");
  section2kendallyValues.push(_val1.toFixed(6));

  result_div2.appendChild(new_input);

  //Criteria_Local_Cl
  var new_input = document.createElement("P");
  _val1 = Criteria_Local_Cl;
  if (isNaN(_val1)) _val1 = 1;
  new_input.innerHTML =
    "Local confidence level among criteria :" + _val1.toFixed(6);

  section2localxValues.push("Local confidence level among criteria");
  section2localyValues.push(_val1.toFixed(6));

  result_div2.appendChild(new_input);

  var new_input = document.createElement("P");
  new_input.classList.add("result");
  _val1 = global_cl;
  if (isNaN(_val1)) _val1 = 1;
  new_input.innerHTML = "Global confidence level :" + _val1.toFixed(6);
  result_div2.appendChild(new_input);

  var new_input = document.createElement("BR");
  result_div2.appendChild(new_input);

  var new_input = document.createElement("P");
  new_input.classList.add("result");
  new_input.innerHTML = "";
  if (global_cl > 0.99)
    new_input.innerHTML =
      "Result: This global confidence level is suitable for Highly Sensitive Problems";
  if (global_cl >= 0.95 && global_cl < 0.99)
    new_input.innerHTML =
      "Result: This global confidence level is suitable for Very Sensitive Problems";
  if (global_cl >= 0.9 && global_cl < 0.95)
    new_input.innerHTML =
      "Result: This global confidence level is suitable for Sensitive Problems";
  if (global_cl < 0.9)
    new_input.innerHTML =
      "Result: This global confidence level is suitable for Less Sensitive Problems";
  result_div2.appendChild(new_input);
  new_input = document.createElement("BR");
  result_div2.appendChild(new_input);

  draw_chart(
    "sectio2chart_kendall",
    "sectio2download_chart_kendall",
    section2kendallxValues,
    section2kendallyValues,
    section2barColors1,
    "",
    "Kendall’s W"
  );

  draw_chart(
    "sectio2chart_local",
    "sectio2download_chart_local",
    section2localxValues,
    section2localyValues,
    section2barColors2,
    "",
    "Local confidence level"
  );

  draw_chart(
    "sectio2chart_c",
    "sectio2download_chart_c",
    section2xValues1,
    section2yValues1,
    section2barColors1,
    "Kendall’s W in each Criterion",
    "Kendall’s W"
  );

  draw_chart(
    "sectio2chart_a",
    "sectio2download_chart_a",
    section2xValues2,
    section2yValues2,
    section2barColors2,
    "Local confidence level in each Criterion",
    "Local confidence level"
  );
  // Section 2 End ----------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  draw_chart(
    "sectio1chart_a",
    "sectio1download_chart_a",
    xValues,
    yValues,
    barColors,
    "Alternatives:",
    "Weight"
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // document.getElementById("btn_calc").disabled = true;
  can_calc = false;

  //window.scrollTo(0,document.body.scrollHeight);
  document.getElementById("sectio1").scrollIntoView();
}

function draw_chart(
  id_chart,
  id_download_btn,
  xValues,
  yValues,
  barColors,
  txt,
  title
) {
  new Chart(id_chart, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          maxBarThickness: 50,
          data: yValues,
        },
      ],
    },

    //////
    options: {
      scales: { y: { title: { display: true, text: title } } },

      // responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: txt,
        },
      },
    },
    /////
  });

  document
    .getElementById(id_download_btn)
    .addEventListener("click", function () {
      /*Get image of canvas element*/
      var url_base64jp = document
        .getElementById(id_chart)
        .toDataURL("image/jpg");
      /*get download button (tag: <a></a>) */
      var a = document.getElementById(id_download_btn);
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    });
}

function draw_line_chart(id_chart, id_download_btn, xValues, txt, dataset) {
  new Chart(id_chart, {
    type: "line",
    data: {
      labels: xValues,
      datasets: dataset,
    },

    //////
    options: {
      scales: { y: { title: { display: true, text: "Global Weight" } } },

      // responsive: true,

      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: txt,
        },
      },
    },
    /////
  });

  document
    .getElementById(id_download_btn)
    .addEventListener("click", function () {
      /*Get image of canvas element*/
      var url_base64jp = document
        .getElementById(id_chart)
        .toDataURL("image/jpg");
      /*get download button (tag: <a></a>) */
      var a = document.getElementById(id_download_btn);
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    });
}

function saveFile() {
  const refrence = document.getElementsByClassName("refrence")[0];
  const result_div2 = document.getElementById("result_div2");

  let data =
    (refrence.innerHTML || refrence.textContent) +
    (result_div1.innerHTML || result_div1.textContent) +
    (result_div2.innerHTML || result_div2.textContent) +
    (tableContainer.innerHTML || tableContainer.textContent);


  var blob = new Blob(["\ufeff", data], {
    //type: 'text'
    type: "application/msword",
    direction: "ltr",
  });

  // var blob2 = new Blob(["\ufeff", data2], {
  //   //type: 'text'
  //   type: "application/msword",
  //   direction: "ltr",
  // });

  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  // set the name of the file
  link.download = "result.doc";
  //link.download = "result.txt";
  // clicking the anchor element will download the file
  link.click();
}

function func_calc() {
  // Clear Chart_div For New Drawing
  if (charts_div1.innerHTML != "") {
    charts_div1.innerHTML = "";
    charts_div1.innerHTML = `<div class="chartContainer">
    <a id="sectio1download_chart_e" download="experts.jpg" href="" title="Save">
      <img src="save.png" width="20px" />
    </a>
    <canvas id="sectio1chart_e"></canvas>
  </div>
  <div class="chartContainer">
    <a id="sectio1download_chart_c" download="criteria.jpg" href="" title="Save">
      <img src="save.png" width="20px" />
    </a>
    <canvas id="sectio1chart_c"></canvas>
  </div>
  <div class="chartContainer">
    <a id="sectio1download_chart_a" download="alternatives.jpg" href="" title="Save">
      <img src="save.png" width="20px" />
    </a>
    <canvas id="sectio1chart_a"></canvas>
  </div>


`;
  }

  if (charts_div2.innerHTML != "") {
    charts_div2.innerHTML = "";
    charts_div2.innerHTML = `<div class="section2TopChart">
      <div class="chartContainerLeft">
        <a id="sectio2download_chart_kendall" download="criteria.jpg" href="" title="Save">
          <img src="save.png" width="20px" />
        </a>
        <canvas id="sectio2chart_kendall"></canvas>
      </div>
      <div class="sectio2chartContainer">
        <a id="sectio2download_chart_c" download="criteria.jpg" href="" title="Save">
          <img src="save.png" width="20px" />
        </a>
        <canvas id="sectio2chart_c"></canvas>
      </div>
    </div>
    <div class="section2TopChart">
      <div class="chartContainerLeft">
        <a id="sectio2download_chart_local" download="alternatives.jpg" href="" title="Save">
          <img src="save.png" width="20px" />
        </a>
        <canvas id="sectio2chart_local"></canvas>
      </div>
      <div class="sectio2chartContainer">
        <a id="sectio2download_chart_a" download="alternatives.jpg" href="" title="Save">
          <img src="save.png" width="20px" />
        </a>
        <canvas id="sectio2chart_a"></canvas>
      </div>
    </div>

  `;
  }

  if (charts_div3.innerHTML != "") {
    charts_div3.innerHTML = "";
    charts_div3.innerHTML = `<div class="chartContainer">
      <a id="sectio3download_chart_c" download="criteria.jpg" href="" title="Save">
        <img src="save.png" width="20px" />
      </a>
      <canvas id="sectio3chart_c"></canvas>
    </div>
    <div class="chartContainer">
      <a id="sectio3download_chart_a" download="alternatives.jpg" href="" title="Save">
        <img src="save.png" width="20px" />
      </a>
      <canvas id="sectio3chart_a"></canvas>
    </div>
  `;
  }

  // Clear Table For New Value
  SecondTable.innerHTML = "";

  // Clear result_div1 For New Value
  result_div1.innerHTML = "";

  // Hide charts_div1
  charts_div1.style = "display:none";

  let validation = true;
  const tableError = document.getElementById("table-error");
  tableError.onanimationend = () => {
    tableError.classList.remove("flicker");
  };
  //init experts[]
  for (let i = 0; i < _number_of_experts; i++) {
    experts[i] = {
      name: "expert_ " + (i + 1).toString(),
      rank: 0,
      selected: 0,
      new_index_i: -1,
      w: 0.0,
    };
  }

  //set experts[]
  for (let i = 0; i < _number_of_experts; i++) {
    experts_value = document.querySelectorAll('td[data-y="' + i + '"]');
    experts[i].name = experts_value[1].innerHTML;
    experts[i].rank = experts_value[2].innerHTML;
    if (experts[i].rank <= 0 || isNaN(experts[i].rank)) {
      validation = false;
    }
    // console.log("experts_value[1].innerHTML=", experts_value[1].innerHTML)
    // console.log("experts_value[2].innerHTML=", experts_value[2].innerHTML)
  }
  console.log("validation= ", validation);

  //init criterias_name[]
  for (let i = 0; i < _number_of_criterias; i++) {
    criterias_name[i] = {
      name: "C" + (i + 1).toString(),
      new_index_i: -1,
      w: 0.0,
    };
  }

  //init alternatives_name[]
  for (let i = 0; i < _number_of_alternatives; i++) {
    alternatives_name[i] = {
      name: "A" + (i + 1).toString(),
      new_index_i: -1,
      w: 0.0,
    };
  }

  //set criterias_name[]
  // for (let i = 0; i < _number_of_criterias; i++) {
  // 	criterias_name[i].name = "C" + i
  // }

  //set alternatives_name[]
  // for (let i = 0; i < _number_of_alternatives; i++) {
  // 	alternatives_name[i].name = "A" + i
  // }

  //init expert_criteria_rank[]
  for (let k = 0; k < _number_of_experts; k++) expert_criteria_rank[k] = [];

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      expert_criteria_rank[i][j] = {
        rank: 0,
        selected: 0,
        new_index_i: -1,
        new_index_j: -1,
        w: 0,
      };
    }
  }
  let tbl_criterias_index = 0;

  //save user data to 	expert_criteria_rank
  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      expert_criteria_rank_value = document.querySelectorAll(
        'td[data-y="' + tbl_criterias_index + '"]'
      );
      expert_criteria_rank[i][j].rank = expert_criteria_rank_value[4].innerHTML;
      if (
        expert_criteria_rank[i][j].rank <= 0 ||
        isNaN(expert_criteria_rank[i][j].rank)
      ) {
        validation = false;
      }
      // console.log("expert_criteria_rank_value= ", "i=", i, "j=", j, expert_criteria_rank_value[4].innerHTML)
      tbl_criterias_index++;
    }
  }

  for (let e = 0; e < _number_of_experts; e++)
    expert_criteria_alternatives_rank[e] = [];

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      expert_criteria_alternatives_rank[i][j] = [];
    }
  }

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        expert_criteria_alternatives_rank[i][j][k] = {
          rank: 0,
          selected: 0,
          joft: 0,
          min_rank_joft: inf,
          new_index_i: -1,
          new_index_j: -1,
          new_index_k: -1,
          w: 0,
          rank_last_joft: -1,
          ind_k_last_joft: -1,
        };
      }
    }
  }
  let tbl_alternatives_index = 0;
  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      tbl_alternatives_index++;
      for (let k = 0; k < _number_of_alternatives; k++) {
        expert_criteria_alternatives_rank_value = document.querySelectorAll(
          'td[data-y="' + k + '"]'
        );
        expert_criteria_alternatives_rank[i][j][k].rank =
          expert_criteria_alternatives_rank_value[
            5 + tbl_alternatives_index
          ].innerHTML;
        if (
          expert_criteria_alternatives_rank[i][j][k].rank <= 0 ||
          isNaN(expert_criteria_alternatives_rank[i][j][k].rank)
        ) {
          validation = false;
        }
        // console.log("expert_criteria_alternatives_rank_value[", 5 + tbl_alternatives_index, "].innerHTML= ", expert_criteria_alternatives_rank_value[5 + tbl_alternatives_index].innerHTML)
      }
    }
  }

  // Check If Data Entery Not Valid Return Error
  if (!validation) {
    tableError.innerText =
      "Please enter the input data correctly and try again";
    tableError.classList.add("flicker");
    return;
  } else {
    tableError.innerText = "";
  }

  for (let e = 0; e < _number_of_experts; e++) arr_mahdodiyatha_A_all[e] = [];

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      arr_mahdodiyatha_A_all[i][j] = [];
    }
  }

  for (let i = 0; i < _number_of_experts; i++) {
    for (let j = 0; j < _number_of_criterias; j++) {
      for (let k = 0; k < _number_of_alternatives; k++) {
        arr_mahdodiyatha_A_all[i][j][k] = { zarib: 0, w: 0 };
      }
    }
  }

  arr_mahdodiyatha_A = [];

  for (let i = 0; i < _number_of_experts; i++) {
    experts[i].selected = 0;
    for (let j = 0; j < _number_of_criterias; j++) {
      expert_criteria_rank[i][j].selected = 0; // {rank:0 , selected : 0, new_index_i:-1, new_index_j:-1, w:0};
      for (let k = 0; k < _number_of_alternatives; k++) {
        // { selected:0 , joft:0 , min_rank_joft:inf   , rank_last_joft:-1 , ind_k_last_joft : -1 };
        expert_criteria_alternatives_rank[i][j][k].selected = 0;
        expert_criteria_alternatives_rank[i][j][k].joft = 0;
        expert_criteria_alternatives_rank[i][j][k].min_rank_joft = inf;
        expert_criteria_alternatives_rank[i][j][k].rank_last_joft = -1;
        expert_criteria_alternatives_rank[i][j][k].ind_k_last_joft = -1;
      }
    }
  }

  let i;
  let k = -1;
  let k_prime = -1;
  let j;

  while (true) {
    //for (let i = 0; i < _number_of_experts; i++)
    i = select_min_rank_experts();
    if (i == -1) break;

    // experts_new.push(experts[i]);
    // criterias_name_new.push(criterias_name[i]);
    // alternatives_name_new.push(alternatives_name[i]);

    //  alert("+++++++++++++");
    while (true) {
      //for (let j = 0; j < _number_of_criterias; j++)
      j = select_min_rank_criteria(i);
      if (j == -1) break;

      while (true) {
        //for(let j = 0; j < _number_of_criterias; j++)
        k = select_min_rank_alt_new(i, j, k);
        if (k == -1) break;
        ind_D = -1;
        let state_darkhaste_k_prime = 0;
        current_rank_is_new = true;
        while (true) {
          //joft
          k_prime = calc_k_prime(i, j, k, state_darkhaste_k_prime);

          // alert(k_prime);
          if (k_prime >= 0) {
            current_rank_is_new = false;
            push_mahdoodiyat(
              i,
              j,
              k,
              k_prime,
              experts[i].rank *
              expert_criteria_rank[i][j].rank *
              expert_criteria_alternatives_rank[i][j][k].rank,
              true,
              true
            ); //add_zaribe_k_prime ,add_zaribe_k
          }

          if (k_prime == -1 && !current_rank_is_new) {
            //move rank_current
            expert_criteria_alternatives_rank[i][j][k].selected = 1;
            current_rank_is_new = true;
          }

          if (k_prime == -1 && current_rank_is_new) {
            //add taki ha
            if (expert_criteria_alternatives_rank[i][j][k].min_rank_joft >= inf)
              push_mahdoodiyat(
                i,
                j,
                k,
                k_prime,
                experts[i].rank *
                expert_criteria_rank[i][j].rank *
                expert_criteria_alternatives_rank[i][j][k].rank,
                false,
                true
              ); //add_zaribe_k_prime ,add_zaribe_k

            break;
          }

          // alert(arr_mahdodiyatha_A);
        }

        expert_criteria_alternatives_rank[i][j][k].selected = 1;
        // alert(k_prime);
      }
    }
  }

  // z function

  let arr_F = [];
  let arr_savabet_B = [];
  let arr_Aeq = [];
  let arr_Aeq_temp = [];
  let arr_Beq = [];

  arr_F.push(-1);
  arr_Aeq_temp.push(0);
  arr_Beq.push(1);
  for (
    let t = 1;
    t <= _number_of_experts * _number_of_criterias * _number_of_alternatives;
    t++
  ) {
    arr_F.push(0);
    arr_Aeq_temp.push(1);
  }

  for (let t = 1; t <= num_namoadelat; t++) {
    arr_savabet_B.push(0);
  }

  arr_Aeq.push(arr_Aeq_temp);

  //var lp=numeric.solveLP(arr_F, arr_mahdodiyatha_A,arr_savabet_B ,arr_Aeq ,arr_Beq   );

  solution = numeric.trunc(
    lp(
      mat(arr_F, true),
      mat(arr_mahdodiyatha_A, true),
      mat(arr_savabet_B, true),
      mat(arr_Aeq, true),
      mat(arr_Beq, true),
      mat([]),
      mat([])
    ),
    1e-12
  );
  console.dir("arr_mahdodiyatha_A_1826" + JSON.stringify(arr_mahdodiyatha_A))
  console.dir("solution_1826" + solution)

  // console.log("solution=" + solution + "  arr_F=" + arr_F + "  arr_mahdodiyatha_A=" + arr_mahdodiyatha_A + "  arr_savabet_B=" + arr_savabet_B)
  z_val = solution[0];
  //alert(solution);

  //alert (str);

  creat_Wijk_ha_from_solution();
  // console.table(Wijk_ha);

  calc_W_ha();

  //console.table(arr_mahdodiyatha_A);

  charts_div1.style.display = "flex";
  charts_div2.style.display = "flex";
  charts_div3.style.display = "flex";

  // if (_number_of_experts == 1) {
  //   document.getElementById("result_div-container").style.display = "none";
  // } else {
  //   document.getElementById("result_div-container").style.display = "block";
  // }

  calc_etebar();

  show_result();

  calc_wij_wik_ha();

  swal(
    "Thank you for choosing OPA. Please check the OPA website and cite to related articles. Thank you, Amin Mahmoudi",
    {
      icon: "success",
    }
  );
}

function ValToRank(vAr) {
  var sorted = [];
  for (var i = 0; i < vAr.length; i++) sorted[i] = vAr[i];
  sorted = sorted.sort(function (a, b) {
    return a - b;
  });
  var ranked = vAr.map(function (v) {
    return sorted.indexOf(v) + 1;
  });
  return ranked;
}

function AverageRanks(rankAr) {
  var avRankAr = [];
  for (var i = 0; i < rankAr.length; i++) avRankAr[i] = rankAr[i];
  for (var i = 0; i <= rankAr.length; i++) {
    n = rankAr.filter((x) => x === i).length;
    if (n > 1) {
      av = (i + (i + n - 1)) / 2;
      for (var j = 0; j < rankAr.length; j++)
        if (rankAr[j] == i) avRankAr[j] = av;
    }
  }
  return avRankAr;
}

function ValueArrayToRankArray(vAr) {
  var rankAr = ValToRank(vAr);
  var avRankAr = AverageRanks(rankAr);
  for (var i = 0; i < avRankAr.length; i++) avRankAr[i] -= 1;
  return avRankAr;
}

function StringToArray(str) {
  return str.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });
}
function TidyStr(str) {
  return StringToArray(str).join(" ");
}

function StrToMx(str, cols) {
  //cols=0 for variable columns
  var lines = (str + "").split("\n");
  var mx = [];
  var j = 0;
  for (var i = 0; i < lines.length; i++) {
    var ar = StringToArray(lines[i]);
    if (ar.length > 0) {
      if (cols > 0 && ar.length != cols) {
        alert("Column Error in Row " + (i + 1) + " Program aborts");
        die();
      }
      mx.push(ar);
    }
  }
  return mx;
}

//Ww
function calc_Ww2(mxDat0) {
  // mxRank_i for each c_i    DoKendallW
  var mxDat = [];
  for (i = 0; i < mxDat0[0].length; i++) mxDat[i] = [];

  for (i = 0; i < mxDat0[0].length; i++)
    for (j = 0; j < mxDat0.length; j++) mxDat[i][j] = mxDat0[j][i];
  //window.alert(mxDat);

  //var mxDat = StrToMx(document.getElementById("dat").value,0);
  var n = mxDat.length; // _number_of_experts???
  var df = n - 1;
  var g = mxDat[0].length; // _number_of_alternatives ???
  var mxRank = Array(n)
    .fill(0)
    .map(() => Array(g).fill(0));

  for (var j = 0; j < g; j++) {
    var arTmp = [];
    for (var i = 0; i < n; i++) arTmp.push(mxDat[i][j]);
    arTmp = ValueArrayToRankArray(arTmp);
    for (var i = 0; i < n; i++) {
      mxRank[i][j] = arTmp[i];
      //mxDM1[i][j] = arTmp[i];
    }
  }
  var resStr =
    "Kendall'W Concordance of multiple raters using ordinal values<br />" +
    'Table of Ranks from Data Entered<table class="nb">';
  for (var i = 0; i < n; i++) {
    resStr += "<tr>";
    for (var j = 0; j < g; j++) resStr += "<td>" + mxRank[i][j] + "</td>";
    resStr += "</tr>";
  }
  resStr += "</table>";

  var SR2 = 0;
  var arDA1 = Array(n);
  for (var i = 0; i < n; i++) {
    arDA1[i] = 0;
    for (var j = 0; j < g; j++) arDA1[i] += mxRank[i][j];
    SR2 += arDA1[i] * arDA1[i];
  }
  var ETj = 0;
  var arDA2 = Array(g);
  for (var j = 0; j < g; j++) {
    arDA2[j] = 0;
    for (var i = 0; i < n - 1; i++)
      if (mxRank[i][j] < 9999) {
        var t = 1;
        var w = mxRank[i][j];
        for (var kk = i + 1; kk < n; kk++) if (mxRank[kk][j] == w) t += 1;
        if (t > 1) {
          arDA2[j] += t * t * t - t;
          mxRank[i][j] = 9999;
          for (var kk = i + 1; kk < n; kk++)
            if (mxRank[kk][j] == w) mxRank[kk][j] = 9999;
        }
      }
    ETj += arDA2[j];
  }

  var W =
    (12.0 * SR2 - 3.0 * g * g * n * df * df) /
    (1.0 * g * g * n * (n * n - 1) - g * ETj);
  resStr += "Kendall's W = " + W.toFixed(4) + "&nbsp;&nbsp;&nbsp;df = " + df;
  //window.alert(W);
  return w;
}
function calc_Ww(mxDat) {
  // mxRank_i for each c_i    DoKendallW
  // var mxDat = StrToMx(mxDat0,0);
  //alert(mxDat);
  var n = mxDat.length; // _number_of_experts???
  var df = n - 1;
  var g = mxDat[0].length; // _number_of_alternatives ???
  var mxRank = Array(n)
    .fill(0)
    .map(() => Array(g).fill(0));

  for (var j = 0; j < g; j++) {
    var arTmp = [];
    for (var i = 0; i < n; i++) arTmp.push(mxDat[i][j]);
    arTmp = ValueArrayToRankArray(arTmp);
    for (var i = 0; i < n; i++) {
      mxRank[i][j] = arTmp[i];
      //mxDM1[i][j] = arTmp[i];
    }
  }
  var resStr =
    "Kendall'W Concordance of multiple raters using ordinal values<br />" +
    'Table of Ranks from Data Entered<table class="nb">';
  for (var i = 0; i < n; i++) {
    resStr += "<tr>";
    for (var j = 0; j < g; j++) resStr += "<td>" + mxRank[i][j] + "</td>";
    resStr += "</tr>";
  }
  resStr += "</table>";

  var SR2 = 0;
  var arDA1 = Array(n);
  for (var i = 0; i < n; i++) {
    arDA1[i] = 0;
    for (var j = 0; j < g; j++) arDA1[i] += mxRank[i][j];
    SR2 += arDA1[i] * arDA1[i];
  }
  var ETj = 0;
  var arDA2 = Array(g);
  for (var j = 0; j < g; j++) {
    arDA2[j] = 0;
    for (var i = 0; i < n - 1; i++)
      if (mxRank[i][j] < 9999) {
        var t = 1;
        var w = mxRank[i][j];
        for (var kk = i + 1; kk < n; kk++) if (mxRank[kk][j] == w) t += 1;
        if (t > 1) {
          arDA2[j] += t * t * t - t;
          mxRank[i][j] = 9999;
          for (var kk = i + 1; kk < n; kk++)
            if (mxRank[kk][j] == w) mxRank[kk][j] = 9999;
        }
      }
    ETj += arDA2[j];
  }

  var W =
    (12.0 * SR2 - 3.0 * g * g * n * df * df) /
    (1.0 * g * g * n * (n * n - 1) - g * ETj);
  resStr += "Kendall's W = " + W.toFixed(4) + "&nbsp;&nbsp;&nbsp;df = " + df;
  //window.alert(W);
  if (isNaN(W)) return 1;
  return W;
}
