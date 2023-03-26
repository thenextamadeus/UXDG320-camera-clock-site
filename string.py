def string_to_divs(string):
  divs = []
  for char in string:
    div = "<div class='item'>" + char + "</div>"
    divs.append(div)
  return "\n".join(divs)

input_string = "it'sonesixtwothreefourfiveseveneleveneightninetenfourteentwelvefifteensixteenseventeeneighteennineteenthirtytwentypasttonoonminutesmidnighto'clockintheafternoonnightmorningeveningfourthreeseventhirtyo'clocknineteenpastmorning"
output_html = string_to_divs(input_string)
print(output_html)