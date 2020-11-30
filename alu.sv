// alu.sv
// author: akira  akira5@pdx.edu
//date : 10/07/2020
// description : The ALU module will perform the combinational logic funcitin as stated 
// in the homework description


import ALU_REGFILE_Defs::*;

module alu (

input logic [ALU_INPUT_WIDTH-1:0]   A_In, B_In, // A and B operands
input logic                         Carry_In,  // Carry In
input aluop_t                       Opcode,    // Operation to perform
output logic [ALU_OUTPUT_WIDTH-1:0] ALU_Out,
output logic                        Carry_Out  // Carry_Out for Add/Substract.                                //  should be 1'b0 otherwise     
);

logic [ALU_INPUT_WIDTH:0] Temp;  // internal variables



always_comb  begin
Carry_Out=1'b0;
case(Opcode)

        ADD_OP:   begin Temp = A_In + B_In  + Carry_In;
        {Carry_Out, ALU_Out}= Temp;
        end
	SUB_OP : begin Temp = A_In + ~B_In + Carry_In;
        {Carry_Out, ALU_Out}= Temp;
        end   
	NOTA_OP:  ALU_Out= ~A_In;
	ORAB_OP:  ALU_Out= A_In | B_In;
	ANDAB_OP: ALU_Out= A_In & B_In;
	NOTAB_OP: ALU_Out= ~A_In & B_In;
	EXOR_OP:  ALU_Out= A_In ^ B_In;
	EXNOR_OP: ALU_Out= A_In ~^B_In;

endcase
end

endmodule: alu