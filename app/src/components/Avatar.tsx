import { Image } from "@chakra-ui/image";
import { Menu, MenuButton, MenuList } from "@chakra-ui/menu";
import { MenuItem } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useProfileQuery } from "../generated/graphql";

interface AvatarProps {
  avatar: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ fetching, data }] = useProfileQuery();
  let imageSource: string = "/static/blank-profile.png";
  if (!fetching && data?.profile?.avatar) {
    imageSource = data.profile.avatar;
  }
  return (
    <Menu>
      <MenuButton>
        <Image borderRadius="full" boxSize="50px" src={imageSource} />
      </MenuButton>
      <MenuList color="black">
        <NextLink href="/account">
          <MenuItem>Account</MenuItem>
        </NextLink>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
