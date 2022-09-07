|%
+$  action
  $%
    [%publish-ad title=tape desc=tape forward=? price=tape images=(list @t)]
    [%toggle-favorite id=@uv]
  ==
:: TODO: change those tapes to @t?
+$  advertisement   [ship=ship id=@uvH date=@da forward=? title=tape desc=tape price=tape images=(list @t)]
+$  initial-ads     [@da (list advertisement)]  :: needs @da to make it unique, otherwise gossip will not propagate this if we send the same list twice.
+$  favorite        [id=@uvH]
+$  state-0
  $:  %0
      ads=(map ship (list advertisement))
      myads=(list advertisement)
      favorites=(list favorite)
  ==
--  

