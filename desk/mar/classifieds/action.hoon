/-  classifieds
=,  format
|_  act=action:classifieds
++  grab
  |%  
  ++  noun  action:classifieds
  ++  json
    |=  jon=^json
    %-  action:classifieds
    =<  (client-action jon)  
    |% 
    ++  client-action
        %-  of:dejs
        :~  [%pub-advertisement parse-ad]
        ==
    ++  parse-ad
        %-  ot:dejs
        :~  [%title sa:dejs]
            [%desc sa:dejs]
        ==
    --
  --  
++  grow
  |%  
  ++  noun  act 
  --  
++  grad  %noun
--