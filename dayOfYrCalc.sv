
///////////////////////////////////////////////////////////
//author: Akira,  akira5@pdx.edu
//
//date : 08/10/2020
// to return the day of the year for a specified date
//
////////////////////////////////////////////////////////////

module dayOfYrCalc (

input  logic	[5:0]	dayOfMonth,
input  logic	[10:0]	year,
input  logic    [3:0]   month,
output logic	[8:0]	dayOfYear
);

 logic [8:0]month_calculation;

assign  dayOfYear = dayOfMonth+ month_calculation;
assign  year = ((year % 11'd400) == 11'd0) ||
		(((year % 4)  == 11'd0) && ((year % 100) != 11'd0));

always_comb   begin

unique case (month) 

4'd1:  month_calculation =0; // since it is the first month of a year;                 
4'd2:  month_calculation =31; // because Janauary has 31 days;
4'd3:  month_calculation =59; // for march, it will be 31+28, non-leap year;
4'd4:  month_calculation =90;  // so on and so forth...
4'd5:  month_calculation =120;
4'd6:  month_calculation =151;
4'd7:  month_calculation =181;
4'd8:  month_calculation =212;
4'd9:  month_calculation =243;
4'd10: month_calculation =273;
4'd11: month_calculation =304;
4'd12: month_calculation =334;

endcase

month_calculation = month_calculation + ((month>2)&& year? 1:0);

end

endmodule: dayOfYrCalc
