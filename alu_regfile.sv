//////////////////////////////////////////////////////////////////////////////////////////////
// 
//
//for Problem 1, step b, 
//
//Author : akira / email address : akira5@pdx.edu
// Purpose: to creat DUT modle called alu.regfile.sv by instantiating instances of ALU module 
//and Regisger file module
//////////////////////////////////////////////////////////////////////////////////////////////

import ALU_REGFILE_Defs ::*;

module alu_regfile (

// register file interface

input logic [ REGFILE_ADDR_WIDTH-1:0]  Read_Addr_1,  // read port addresses
                                       Read_Addr_2,

input logic [ REGFILE_ADDR_WIDTH-1:0]  Write_Addr, // write port address
input logic                            Write_enable, // wrie enable (1 to wirte)

input logic [ REGFILE_WIDTH-1:0]       Write_data, // data to write into the register file

// ALU interface, Data to the ALU comes from the registr file

input logic                            Carry_In,      // Carry in
input aluop_t                          Opcode,       // operation to perform
output logic [ALU_OUTPUT_WIDTH-1:0]    ALU_Out,      // ALu result
output logic                           Carry_Out,    // Carry_Out for Add/ Sub

// system-wide signals

input logic                             Clock       // sytem clock 
);

// internal signals to connect the register file to the ALU.

logic [REGFILE_WIDTH-1:0] Data_Out_1, Data_Out_2; // read port outputs from register file


// Instantiating ALU and Reg File

alu ALU_INST (        

.A_In( Data_Out_1[7:0]),
.B_In( Data_Out_2[7:0]),
.Carry_In( Carry_In),
.Opcode(Opcode),
.ALU_Out (ALU_Out),
.Carry_Out (Carry_Out)
);

register_file REGFILE_INST(

.Data_Out_1(Data_Out_1), 
.Data_Out_2(Data_Out_2),
.Data_In (Write_data),
.Read_Addr_1(Read_Addr_1), 
.Read_Addr_2(Read_Addr_2),
.Write_Addr(Write_Addr),
.Write_enable(Write_enable),
.Clock (Clock)
);

endmodule 