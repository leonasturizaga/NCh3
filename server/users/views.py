from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .models import PersonalInformationToValidate
from .serializers import RegisterSerializer, UserSerializer, RegisterWithKYCSerializer, UpdatePersonalDataSerializer, AddGarantorSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
        
        
class RegisterWithKYC(generics.CreateAPIView):
   
    def post(self, request):
        serializer = RegisterWithKYCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ValidateUserView(generics.CreateAPIView):
    def get(self, request):
        queryset = PersonalInformationToValidate.objects.all()
        serializer = RegisterWithKYCSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        try:
            user_to_validate = User.objects.get(pk=pk)
        except (PersonalInformationToValidate.DoesNotExist, User.DoesNotExist):
            return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if user_to_validate.validated:
            return Response({'error':'User already validated'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_to_validate.validated = True
        
        return Response(status=status.HTTP_200_OK)


class UpdatePersonalDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UpdatePersonalDataSerializer(instance=user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated succesfully'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class AddGarantorView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        serializer = AddGarantorSerializer(data=request.data, context={'original_user':user})
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({'message': 'Garantor added succesfully'}, status=status.HTTP_200_OK)