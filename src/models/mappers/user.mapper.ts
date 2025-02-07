import {GroupMemberResponse} from 'tyr-api/types/axios';
import {GroupMemberModel} from '@/models/group-member.model';

export class UserMapper {

  private constructor() {}

  static groupMemberResponseToModel(groupMember: GroupMemberResponse): GroupMemberModel {
    return new GroupMemberModel({
      id: groupMember.id,
      email: groupMember.email
    });
  }

}
