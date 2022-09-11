|%
+$  action
  $%
    [%publish-ad title=tape desc=tape forward=? price=tape images=(list @t)]
    [%toggle-favorite id=@uv]
    [%delete-ad id=@uv]
    [%send-message advertisement-id=@uv to=ship text=tape]
    [%receive-message advertisement-id=@uvH msg=msg]
  ==
:: TODO: change those tapes to @t?
::
+$  advertisement 
    $:
      =ship 
      id=@uvH 
      date=@da 
      forward=? 
      title=tape 
      desc=tape 
      price=tape 
      images=(list @t)
    ==
:: needs @da timestamp to make it unique, otherwise gossip will not propagate this if we send the same list twice.
::
+$  initial-ads  [timestamp=@da (list advertisement)]  
+$  favorite     [id=@uvH]
+$  chat         [receiver=ship advertisement-id=@uvh msgs=(list msg)]
+$  msg          [ship=ship date=@da text=tape]
+$  state-0
  $:  %0
      ads=(map ship (list advertisement))
      myads=(list advertisement)
      favorites=(list favorite)
      chats=(list chat)
  ==
--  

