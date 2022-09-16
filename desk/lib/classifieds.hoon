/-  *classifieds 
=,  format
|% 
++  to-json
    |%  
    ++  state
        |=  s=state-0
        %-  pairs:enjs
        :~  ['ads' %a (turn `(list advertisement)`(zing ~(val by ads:s)) parse-ad)]
            ['myads' %a (turn myads:s parse-ad)]
            ['favorites' %a (turn favorites:s parse-id)]
            ['chats' %a (turn chats:s parse-chat)]
        ==
    ++  ads
        |=  ads=(map ship (list advertisement))
        %-  pairs:enjs
        :~  ['ads' %a (turn `(list advertisement)`(zing ~(val by ads)) parse-ad)]
        ==
    ++  myads
        |=  myads=(list advertisement)
        %-  pairs:enjs
        :~  ['myads' %a (turn myads parse-ad)]
        ==
    ++  favorites
        |=  favs=(list favorite)
        %-  pairs:enjs
        :~  ['favorites' %a (turn favs parse-id)]
        ==
    ++  chats
        |=  chats=(list chat)
        %-  pairs:enjs
        :~  ['chats' %a (turn chats parse-chat)]
        ==
    ++  parse-ad
        |=  ad=advertisement
        %-  pairs:enjs  
        :~  [%ship %s (scot %p ship:ad)]
            [%id %s (scot %uv id:ad)]
            [%date %s (scot %da date:ad)]
            [%title %s (crip title:ad)]
            [%desc %s (crip desc:ad)]
            [%price %s (crip price:ad)]
            [%forward %b forward:ad]
            [%images %a (turn images:ad parse-img)]
        ==
    ++  parse-id
        |=  id=@uvH
        [%s (scot %uv id)]
    ++  parse-img
        |=  img=@t
        [%s img]
    ++  parse-chat
        |=  chat=chat
        %-  pairs:enjs
        :~  [%receiver %s (scot %p receiver:chat)]
            [%advertisement-id %s (scot %uv advertisement-id:chat)]
            [%msgs %a (turn msgs:chat parse-msg)]
        ==
    ++  parse-msg
        |=  msg=msg
        %-  pairs:enjs
        :~  [%ship %s (scot %p ship:msg)]
            [%date %s (scot %da date:msg)]
            [%text %s (crip text:msg)]
        ==
    --
++  from-json
    |% 
    ++  action
        |=  jon=json
        (client-action jon)
    ++  client-action
        %-  of:dejs
        :~  [%publish-ad parse-ad]
            [%delete-ad parse-id]
            [%toggle-favorite parse-id]
            [%send-message parse-send-message]
            [%edit-ad parse-edit-ad]
        ==
    ++  parse-ad
        %-  ot:dejs
        :~  [%title sa:dejs]
            [%desc sa:dejs]
            [%forward bo:dejs]
            [%price sa:dejs]    
            [%images (ar so):dejs]
        ==
    ++  parse-send-message
        %-  ot:dejs
        :~  [%advertisement-id (se %uv):dejs]
            [%to (se:dejs %p)]
            [%text sa:dejs]
        ==
    ++  parse-edit-ad
        %-  ot:dejs
        :~  [%id (se %uv):dejs]
            [%title sa:dejs-soft]
            [%desc sa:dejs-soft]
            [%forward bo:dejs-soft]
            [%price sa:dejs-soft]    
            [%images (ar so):dejs-soft]
        ==
    ++  parse-id
        %-  ot:dejs
        :~  [%id (se %uv):dejs]
        ==
    --
--