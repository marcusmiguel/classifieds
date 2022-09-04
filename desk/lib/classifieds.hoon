/-  *classifieds 
=,  format
|% 
++  state
    |%  
    ++  to-json
        |=  s=state-0
        %-  pairs:enjs
        :~  ['ads' %a (turn `(list advertisement)`(zing ~(val by ads:s)) parse-ad)]
            ['myads' %a (turn myads:s parse-ad)]
            ['favorites' %a (turn favorites:s parse-id)]
        ==
    ++  parse-ad
        |=  ad=advertisement
        %-  pairs:enjs  
        :~  [%ship %s (scot %p ship:ad)]
            [%id %s (scot %uvh id:ad)]
            [%date %s (scot %da date:ad)]
            [%title %s (crip title:ad)]
            [%desc %s (crip desc:ad)]
            [%price %s (crip price:ad)]
            [%forward %b forward:ad]
            [%images %a (turn images:ad parse-img)]
        ==
    ++  parse-img
        |=  img=@t
        [%s img]
    ++  parse-id
        |=  id=@uvH
        [%s (scot %uvh id)]
    --
++  action
    |% 
    ++  from-json
        |=  jon=json
        ~&  jon
        (client-action jon)
    ++  client-action
        %-  of:dejs
        :~  [%publish-ad parse-ad]
            [%toggle-favorite parse-id]
        ==
    ++  parse-ad
        %-  ot:dejs
        :~  [%title sa:dejs]
            [%desc sa:dejs]
            [%forward bo:dejs]
            [%price sa:dejs]    
            [%images (ar so):dejs]
        ==
    ++  parse-id
        %-  ot:dejs
        :~  [%id (se %uv):dejs]
        ==
    --
--